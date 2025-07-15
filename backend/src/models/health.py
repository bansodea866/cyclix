from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date
import json

db = SQLAlchemy()

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), unique=True, nullable=False)  # Can be session-based or user ID
    date_of_birth = db.Column(db.Date, nullable=True)
    goals = db.Column(db.Text, nullable=True)  # JSON string of selected goals
    motivations = db.Column(db.Text, nullable=True)  # JSON string of motivations
    sex_life_goals = db.Column(db.Text, nullable=True)  # JSON string if applicable
    sleep_goals = db.Column(db.Text, nullable=True)  # JSON string of sleep improvements
    sleep_hours = db.Column(db.String(20), nullable=True)  # e.g., "7-8 hours"
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<UserProfile {self.user_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'goals': json.loads(self.goals) if self.goals else [],
            'motivations': json.loads(self.motivations) if self.motivations else [],
            'sex_life_goals': json.loads(self.sex_life_goals) if self.sex_life_goals else [],
            'sleep_goals': json.loads(self.sleep_goals) if self.sleep_goals else [],
            'sleep_hours': self.sleep_hours,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class CycleData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    period_start_date = db.Column(db.Date, nullable=False)
    period_end_date = db.Column(db.Date, nullable=True)
    cycle_length = db.Column(db.Integer, default=28)  # Average cycle length
    period_length = db.Column(db.Integer, default=5)  # Average period length
    is_predicted = db.Column(db.Boolean, default=False)  # True for predicted cycles
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<CycleData {self.user_id} - {self.period_start_date}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'period_start_date': self.period_start_date.isoformat(),
            'period_end_date': self.period_end_date.isoformat() if self.period_end_date else None,
            'cycle_length': self.cycle_length,
            'period_length': self.period_length,
            'is_predicted': self.is_predicted,
            'created_at': self.created_at.isoformat()
        }

class SymptomLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    log_date = db.Column(db.Date, nullable=False)
    symptoms = db.Column(db.Text, nullable=True)  # JSON string of symptoms
    mood = db.Column(db.String(50), nullable=True)
    energy_level = db.Column(db.Integer, nullable=True)  # 1-10 scale
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<SymptomLog {self.user_id} - {self.log_date}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'log_date': self.log_date.isoformat(),
            'symptoms': json.loads(self.symptoms) if self.symptoms else [],
            'mood': self.mood,
            'energy_level': self.energy_level,
            'notes': self.notes,
            'created_at': self.created_at.isoformat()
        }

class SleepLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    log_date = db.Column(db.Date, nullable=False)
    sleep_hours = db.Column(db.Float, nullable=True)  # Hours of sleep
    sleep_quality = db.Column(db.Integer, nullable=True)  # 1-10 scale
    bedtime = db.Column(db.Time, nullable=True)
    wake_time = db.Column(db.Time, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<SleepLog {self.user_id} - {self.log_date}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'log_date': self.log_date.isoformat(),
            'sleep_hours': self.sleep_hours,
            'sleep_quality': self.sleep_quality,
            'bedtime': self.bedtime.isoformat() if self.bedtime else None,
            'wake_time': self.wake_time.isoformat() if self.wake_time else None,
            'notes': self.notes,
            'created_at': self.created_at.isoformat()
        }

class ActivityLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    log_date = db.Column(db.Date, nullable=False)
    activity_type = db.Column(db.String(100), nullable=True)  # e.g., "exercise", "walking"
    duration_minutes = db.Column(db.Integer, nullable=True)
    intensity = db.Column(db.String(20), nullable=True)  # "low", "medium", "high"
    calories_burned = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<ActivityLog {self.user_id} - {self.log_date}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'log_date': self.log_date.isoformat(),
            'activity_type': self.activity_type,
            'duration_minutes': self.duration_minutes,
            'intensity': self.intensity,
            'calories_burned': self.calories_burned,
            'notes': self.notes,
            'created_at': self.created_at.isoformat()
        }

class WellbeingBattery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    log_date = db.Column(db.Date, nullable=False)
    battery_level = db.Column(db.Integer, nullable=False)  # 0-100 percentage
    factors = db.Column(db.Text, nullable=True)  # JSON string of contributing factors
    cycle_phase = db.Column(db.String(50), nullable=True)  # "menstrual", "follicular", "ovulation", "luteal"
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<WellbeingBattery {self.user_id} - {self.log_date}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'log_date': self.log_date.isoformat(),
            'battery_level': self.battery_level,
            'factors': json.loads(self.factors) if self.factors else {},
            'cycle_phase': self.cycle_phase,
            'created_at': self.created_at.isoformat()
        }

