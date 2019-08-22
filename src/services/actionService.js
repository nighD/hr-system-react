import * as constants from '../constants/url'
import baseService from './baseService'

export function getUserList() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.userList);
}
export function getUserdetail(uid) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.userDetail + uid);
}

export function findUserByName(name){
    return baseService(constants.GET_METHOD,constants.baseURL + constants.userName + name)
}

export function getManagers() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.userManager);
}
export function updateUserdetail(uid,data) {
    return baseService(constants.PUT_METHOD, constants.baseURL + constants.userDetail + uid,data);
}
export function getTeamlist() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.teamList);
}
export function getTeamdetail(team_id) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.teamDetail + team_id);
}
export function getTeamManager(team_id) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.teamManager + team_id);
}
export function getAttdetail(uid) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.emp_att_detail + uid);
}
export function getEvent() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.events);
}
export function addEvent(data) {
    return baseService(constants.POST_METHOD, constants.baseURL + constants.events, data);
}
export function getLeaveList() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.leaves);
}
export function getLeavesStatus(status) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.leaves_status+status);
}
export function getEmpLeaveList(id) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.leaves + id);
}

export function getGoalList(id){
    return baseService(constants.GET_METHOD,constants.baseURL + constants.goalListEmp + id)
}

export function getGoalID(id){
    return baseService(constants.GET_METHOD,constants.baseURL + constants.goalListID + id)
}

export function getEmp_Worked_Hours(data){
    return baseService(constants.POST_METHOD,constants.baseURL + constants.getWorkedHour,data)
}

export function updateGoalID(id,goal){
    return baseService(constants.PUT_METHOD, constants.baseURL + constants.goalUpdateID + id,goal)
}


export function predictAttritionID(id){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.predict_attrition_id + id);
}
export function predictFraudID(id){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.predict_fraud_id + id);
}

export function comparison_attrition(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.comparison_target_attrition);
}
export function comparison_fraud(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.comparison_target_fraud);
}
export function comparison_predict_attrition(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.comparison_predict_attrition);
}
export function comparison_predict_fraud(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.comparison_predict_fraud);
}

export function resultAttrition(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.result_attrition);
}
export function resultFraud(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.result_fraud);
}

export function getColumnsName(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.columns_name);
}
export function getData(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.get_data);
}
export function getUnseenData(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.unseen_data);
}
export function get_unseen_data_attrition(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.unseen_data_attrition);
}
export function get_unseen_data_fraud(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.unseen_data_fraud);
}
export function get_unseen_target_attrition(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.unseen_target_attrition);
}
export function get_unseen_target_fraud(){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.unseen_target_fraud);
}
export function find_unseen_data(id){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.find_unseen_data+id);
}
export function find_unseen_data_attrition(id){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.find_unseen_data_attrition+id);
}
export function find_unseen_data_fraud(id){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.find_unseen_data_fraud+id);
}
export function find_unseen_target_attrition(id){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.find_unseen_target_attrition+id);
}
export function find_unseen_target_fraud(id){
    return baseService(constants.GET_METHOD,constants.baseURL_data + constants.find_unseen_target_fraud+id);
}

export function getDataReport(id){
    switch(id) {
        case 1:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.age_distribution);
        case 2:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.education_field);
        case 3:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.gender_distribution);
        case 4:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.marital_distribution);
        case 5:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.distance_distribution);
        case 6:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.department);
        case 7:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.business_travel);
        case 8:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.job_role);
        case 9:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.job_level);
        case 10:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.job_involve);
        case 11:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.training_last_year);
        case 12:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.companies_worked);
        case 13:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.years_at_company);
        case 14:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.years_in_current_role);
        case 15:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.years_in_last_promotion);
        case 16:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.total_work_years);
        case 17:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.years_with_curr_manager);
        case 18:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.work_life_balance);
        case 19:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.over_time);
        case 20:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.monthly_income);
        case 21:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.percent_salary_hike);
        case 22:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.stock_option_level);
        case 23:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.env_satis);
        case 24:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.job_satis);
        case 25:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.relationship_satis);
        case 26:
            return baseService(constants.GET_METHOD,constants.baseURL_data + constants.performance_rating);
        default: 


    }

     
}
