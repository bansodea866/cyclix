from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from src.models.health import (
    UserProfile, CycleData, SymptomLog, SleepLog, 
    ActivityLog, WellbeingBattery, db
)
from datetime import datetime, date, timedelta
import json

health_bp = Blueprint('health', __name__)

# Enable CORS for all routes in this blueprint
@health_bp.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# User Profile Routes
@health_bp.route('/profile', methods=['POST'])
@cross_origin()
def create_or_update_profile():
    data = request.json
    user_id = data.get('user_id', 'default_user')
    
    profile = UserProfile.query.filter_by(user_id=user_id).first()
    
    if profile:
        # Update existing profile
        if 'date_of_birth' in data:
            profile.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
        if 'goals' in data:
            profile.goals = json.dumps(data['goals'])
        if 'motivations' in data:
            profile.motivations = json.dumps(data['motivations'])
        if 'sex_life_goals' in data:
            profile.sex_life_goals = json.dumps(data['sex_life_goals'])
        if 'sleep_goals' in data:
            profile.sleep_goals = json.dumps(data['sleep_goals'])
        if 'sleep_hours' in data:
            profile.sleep_hours = data['sleep_hours']
        profile.updated_at = datetime.utcnow()
    else:
        # Create new profile
        profile = UserProfile(
            user_id=user_id,
            date_of_birth=datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date() if 'date_of_birth' in data else None,
            goals=json.dumps(data.get('goals', [])),
            motivations=json.dumps(data.get('motivations', [])),
            sex_life_goals=json.dumps(data.get('sex_life_goals', [])),
            sleep_goals=json.dumps(data.get('sleep_goals', [])),
            sleep_hours=data.get('sleep_hours')
        )
        db.session.add(profile)
    
    db.session.commit()
    return jsonify(profile.to_dict()), 201

@health_bp.route('/profile/<user_id>', methods=['GET'])
@cross_origin()
def get_profile(user_id):
    profile = UserProfile.query.filter_by(user_id=user_id).first()
    if not profile:
        return jsonify({'error': 'Profile not found'}), 404
    return jsonify(profile.to_dict())

# Cycle Data Routes
@health_bp.route('/cycle', methods=['POST'])
@cross_origin()
def log_cycle():
    data = request.json
    user_id = data.get('user_id', 'default_user')
    
    cycle = CycleData(
        user_id=user_id,
        period_start_date=datetime.strptime(data['period_start_date'], '%Y-%m-%d').date(),
        period_end_date=datetime.strptime(data['period_end_date'], '%Y-%m-%d').date() if 'period_end_date' in data else None,
        cycle_length=data.get('cycle_length', 28),
        period_length=data.get('period_length', 5),
        is_predicted=data.get('is_predicted', False)
    )
    
    db.session.add(cycle)
    db.session.commit()
    
    # Generate predictions for next cycles
    generate_cycle_predictions(user_id, cycle.period_start_date, cycle.cycle_length)
    
    return jsonify(cycle.to_dict()), 201

@health_bp.route('/cycle/<user_id>', methods=['GET'])
@cross_origin()
def get_cycles(user_id):
    cycles = CycleData.query.filter_by(user_id=user_id).order_by(CycleData.period_start_date.desc()).all()
    return jsonify([cycle.to_dict() for cycle in cycles])

@health_bp.route('/cycle/predictions/<user_id>', methods=['GET'])
@cross_origin()
def get_cycle_predictions(user_id):
    today = date.today()
    future_date = today + timedelta(days=90)  # Next 3 months
    
    predictions = CycleData.query.filter(
        CycleData.user_id == user_id,
        CycleData.is_predicted == True,
        CycleData.period_start_date >= today,
        CycleData.period_start_date <= future_date
    ).order_by(CycleData.period_start_date).all()
    
    return jsonify([pred.to_dict() for pred in predictions])

def generate_cycle_predictions(user_id, last_period_start, cycle_length):
    """Generate cycle predictions for the next 6 months"""
    # Clear existing predictions
    CycleData.query.filter(
        CycleData.user_id == user_id,
        CycleData.is_predicted == True
    ).delete()
    
    # Generate predictions
    current_date = last_period_start
    for i in range(6):  # Next 6 cycles
        current_date = current_date + timedelta(days=cycle_length)
        prediction = CycleData(
            user_id=user_id,
            period_start_date=current_date,
            cycle_length=cycle_length,
            period_length=5,
            is_predicted=True
        )
        db.session.add(prediction)
    
    db.session.commit()

# Symptom Logging Routes
@health_bp.route('/symptoms', methods=['POST'])
@cross_origin()
def log_symptoms():
    data = request.json
    user_id = data.get('user_id', 'default_user')
    
    symptom_log = SymptomLog(
        user_id=user_id,
        log_date=datetime.strptime(data['log_date'], '%Y-%m-%d').date(),
        symptoms=json.dumps(data.get('symptoms', [])),
        mood=data.get('mood'),
        energy_level=data.get('energy_level'),
        notes=data.get('notes')
    )
    
    db.session.add(symptom_log)
    db.session.commit()
    return jsonify(symptom_log.to_dict()), 201

@health_bp.route('/symptoms/<user_id>', methods=['GET'])
@cross_origin()
def get_symptoms(user_id):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    query = SymptomLog.query.filter_by(user_id=user_id)
    
    if start_date:
        query = query.filter(SymptomLog.log_date >= datetime.strptime(start_date, '%Y-%m-%d').date())
    if end_date:
        query = query.filter(SymptomLog.log_date <= datetime.strptime(end_date, '%Y-%m-%d').date())
    
    symptoms = query.order_by(SymptomLog.log_date.desc()).all()
    return jsonify([symptom.to_dict() for symptom in symptoms])

# Sleep Logging Routes
@health_bp.route('/sleep', methods=['POST'])
@cross_origin()
def log_sleep():
    data = request.json
    user_id = data.get('user_id', 'default_user')
    
    sleep_log = SleepLog(
        user_id=user_id,
        log_date=datetime.strptime(data['log_date'], '%Y-%m-%d').date(),
        sleep_hours=data.get('sleep_hours'),
        sleep_quality=data.get('sleep_quality'),
        bedtime=datetime.strptime(data['bedtime'], '%H:%M').time() if 'bedtime' in data else None,
        wake_time=datetime.strptime(data['wake_time'], '%H:%M').time() if 'wake_time' in data else None,
        notes=data.get('notes')
    )
    
    db.session.add(sleep_log)
    db.session.commit()
    return jsonify(sleep_log.to_dict()), 201

@health_bp.route('/sleep/<user_id>', methods=['GET'])
@cross_origin()
def get_sleep_logs(user_id):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    query = SleepLog.query.filter_by(user_id=user_id)
    
    if start_date:
        query = query.filter(SleepLog.log_date >= datetime.strptime(start_date, '%Y-%m-%d').date())
    if end_date:
        query = query.filter(SleepLog.log_date <= datetime.strptime(end_date, '%Y-%m-%d').date())
    
    sleep_logs = query.order_by(SleepLog.log_date.desc()).all()
    return jsonify([log.to_dict() for log in sleep_logs])

# Activity Logging Routes
@health_bp.route('/activity', methods=['POST'])
@cross_origin()
def log_activity():
    data = request.json
    user_id = data.get('user_id', 'default_user')
    
    activity_log = ActivityLog(
        user_id=user_id,
        log_date=datetime.strptime(data['log_date'], '%Y-%m-%d').date(),
        activity_type=data.get('activity_type'),
        duration_minutes=data.get('duration_minutes'),
        intensity=data.get('intensity'),
        calories_burned=data.get('calories_burned'),
        notes=data.get('notes')
    )
    
    db.session.add(activity_log)
    db.session.commit()
    return jsonify(activity_log.to_dict()), 201

@health_bp.route('/activity/<user_id>', methods=['GET'])
@cross_origin()
def get_activity_logs(user_id):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    query = ActivityLog.query.filter_by(user_id=user_id)
    
    if start_date:
        query = query.filter(ActivityLog.log_date >= datetime.strptime(start_date, '%Y-%m-%d').date())
    if end_date:
        query = query.filter(ActivityLog.log_date <= datetime.strptime(end_date, '%Y-%m-%d').date())
    
    activity_logs = query.order_by(ActivityLog.log_date.desc()).all()
    return jsonify([log.to_dict() for log in activity_logs])

# Wellbeing Battery Routes
@health_bp.route('/wellbeing', methods=['POST'])
@cross_origin()
def calculate_wellbeing():
    data = request.json
    user_id = data.get('user_id', 'default_user')
    log_date = datetime.strptime(data.get('log_date', date.today().isoformat()), '%Y-%m-%d').date()
    
    # Calculate wellbeing battery based on various factors
    battery_level = calculate_battery_level(user_id, log_date)
    cycle_phase = determine_cycle_phase(user_id, log_date)
    
    # Check if entry exists for today
    existing = WellbeingBattery.query.filter_by(user_id=user_id, log_date=log_date).first()
    
    if existing:
        existing.battery_level = battery_level
        existing.cycle_phase = cycle_phase
        existing.factors = json.dumps(data.get('factors', {}))
    else:
        wellbeing = WellbeingBattery(
            user_id=user_id,
            log_date=log_date,
            battery_level=battery_level,
            factors=json.dumps(data.get('factors', {})),
            cycle_phase=cycle_phase
        )
        db.session.add(wellbeing)
    
    db.session.commit()
    return jsonify(existing.to_dict() if existing else wellbeing.to_dict()), 201

@health_bp.route('/wellbeing/<user_id>', methods=['GET'])
@cross_origin()
def get_wellbeing(user_id):
    today = date.today()
    wellbeing = WellbeingBattery.query.filter_by(user_id=user_id, log_date=today).first()
    
    if not wellbeing:
        # Calculate for today if not exists
        battery_level = calculate_battery_level(user_id, today)
        cycle_phase = determine_cycle_phase(user_id, today)
        
        wellbeing = WellbeingBattery(
            user_id=user_id,
            log_date=today,
            battery_level=battery_level,
            factors=json.dumps({}),
            cycle_phase=cycle_phase
        )
        db.session.add(wellbeing)
        db.session.commit()
    
    return jsonify(wellbeing.to_dict())

def calculate_battery_level(user_id, target_date):
    """Calculate wellbeing battery level based on various health factors"""
    base_level = 50  # Base level
    
    # Get recent sleep data
    recent_sleep = SleepLog.query.filter(
        SleepLog.user_id == user_id,
        SleepLog.log_date >= target_date - timedelta(days=7),
        SleepLog.log_date <= target_date
    ).all()
    
    if recent_sleep:
        avg_sleep = sum(log.sleep_hours for log in recent_sleep if log.sleep_hours) / len(recent_sleep)
        if avg_sleep >= 7:
            base_level += 20
        elif avg_sleep >= 6:
            base_level += 10
        else:
            base_level -= 10
    
    # Get recent symptoms
    recent_symptoms = SymptomLog.query.filter(
        SymptomLog.user_id == user_id,
        SymptomLog.log_date >= target_date - timedelta(days=3),
        SymptomLog.log_date <= target_date
    ).all()
    
    if recent_symptoms:
        avg_energy = sum(log.energy_level for log in recent_symptoms if log.energy_level) / len(recent_symptoms)
        base_level += (avg_energy - 5) * 3  # Scale energy level impact
    
    # Cycle phase impact
    cycle_phase = determine_cycle_phase(user_id, target_date)
    if cycle_phase == 'menstrual':
        base_level -= 15
    elif cycle_phase == 'ovulation':
        base_level += 15
    elif cycle_phase == 'luteal':
        base_level -= 5
    
    return max(0, min(100, base_level))

def determine_cycle_phase(user_id, target_date):
    """Determine current cycle phase based on period data"""
    # Get most recent period
    recent_cycle = CycleData.query.filter(
        CycleData.user_id == user_id,
        CycleData.period_start_date <= target_date
    ).order_by(CycleData.period_start_date.desc()).first()
    
    if not recent_cycle:
        return 'unknown'
    
    days_since_period = (target_date - recent_cycle.period_start_date).days
    cycle_length = recent_cycle.cycle_length
    
    if days_since_period <= 5:
        return 'menstrual'
    elif days_since_period <= cycle_length // 2 - 2:
        return 'follicular'
    elif days_since_period <= cycle_length // 2 + 2:
        return 'ovulation'
    else:
        return 'luteal'

# Dashboard Summary Route
@health_bp.route('/dashboard/<user_id>', methods=['GET'])
@cross_origin()
def get_dashboard_summary(user_id):
    today = date.today()
    
    # Get wellbeing battery
    wellbeing = WellbeingBattery.query.filter_by(user_id=user_id, log_date=today).first()
    if not wellbeing:
        battery_level = calculate_battery_level(user_id, today)
        cycle_phase = determine_cycle_phase(user_id, today)
        wellbeing = {
            'battery_level': battery_level,
            'cycle_phase': cycle_phase,
            'factors': {}
        }
    else:
        wellbeing = wellbeing.to_dict()
    
    # Get next period prediction
    next_period = CycleData.query.filter(
        CycleData.user_id == user_id,
        CycleData.is_predicted == True,
        CycleData.period_start_date > today
    ).order_by(CycleData.period_start_date).first()
    
    # Get ovulation prediction
    if next_period:
        ovulation_date = next_period.period_start_date - timedelta(days=14)
        days_to_ovulation = (ovulation_date - today).days
    else:
        ovulation_date = None
        days_to_ovulation = None
    
    return jsonify({
        'wellbeing': wellbeing,
        'next_period': {
            'date': next_period.period_start_date.isoformat() if next_period else None,
            'days_away': (next_period.period_start_date - today).days if next_period else None
        },
        'ovulation': {
            'date': ovulation_date.isoformat() if ovulation_date else None,
            'days_away': days_to_ovulation
        },
        'cycle_phase': wellbeing['cycle_phase']
    })

