from flask import Blueprint, request, jsonify
from src.models.health import UserProfile # Corrected import
from src.main import db

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/profile", methods=["POST"])
def create_or_update_profile():
    data = request.json
    user_id = data.get("user_id") # In a real app, this would come from authentication

    if not user_id:
        return jsonify({"message": "User ID is required"}), 400

    profile = UserProfile.query.filter_by(user_id=user_id).first() # Use filter_by for user_id

    if profile:
        # Update existing profile
        profile.goal = data.get("goal", profile.goal)
        profile.motivations = data.get("motivations", profile.motivations)
        profile.sex_life_enhancements = data.get("sexLifeEnhancements", profile.sex_life_enhancements)
        profile.cycle_sex_connection = data.get("cycleSexConnection", profile.cycle_sex_connection)
        profile.sleep_improvements = data.get("sleepImprovements", profile.sleep_improvements)
        profile.sleep_hours = data.get("sleepHours", profile.sleep_hours)
        profile.date_of_birth = data.get("dateOfBirth", profile.date_of_birth)
        profile.last_period_date = data.get("lastPeriodDate", profile.last_period_date)
        profile.period_dates = data.get("periodDates", profile.period_dates)
    else:
        # Create new profile
        profile = UserProfile(
            user_id=user_id,
            goal=data.get("goal"),
            motivations=data.get("motivations"),
            sex_life_enhancements=data.get("sexLifeEnhancements"),
            cycle_sex_connection=data.get("cycleSexConnection"),
            sleep_improvements=data.get("sleepImprovements"),
            sleep_hours=data.get("sleepHours"),
            date_of_birth=data.get("dateOfBirth"),
            last_period_date=data.get("lastPeriodDate"),
            period_dates=data.get("periodDates")
        )
        db.session.add(profile)

    db.session.commit()
    return jsonify({"message": "Profile updated successfully", "profile": profile.to_dict()}), 200

@user_bp.route("/profile/<user_id>", methods=["GET"])
def get_profile(user_id):
    profile = UserProfile.query.filter_by(user_id=user_id).first() # Use filter_by for user_id
    if profile:
        return jsonify({"profile": profile.to_dict()}), 200
    return jsonify({"message": "Profile not found"}), 404


