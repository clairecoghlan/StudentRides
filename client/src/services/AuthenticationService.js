import Api from '@/services/Api'

// these are all the exposed endpoints of the Authentication service
export default {
  register (credentials) {
    console.log('registering credentials via Api()')
    const res = Api().post('register', credentials)
    console.log('Register results', res)
    return res
  },
  login (credentials) {
    console.log('login credentials via Api()')
    const res = Api().post('login', credentials)
    console.log('Login results', res)
    return res
  }
}
