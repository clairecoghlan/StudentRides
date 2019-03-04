import Api from '@/services/Api'

// these are all the exposed endpoints of the Authentication service
export default {
  setDaysOfWeek (user) {
    console.log('setup daysOfWeek  via Api()', user)
    return Api().get(`daysOfWeek/`, user)
  }
}
