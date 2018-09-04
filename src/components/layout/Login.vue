
<template>
  <div id="app">
    <section class="user" v-show="refreshing" :class="{'refreshing' : disabled}">
      <div class="user_options-container">
        <div class="user_options-text">

          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">
              Don't have an account?
            </h2>
            <p class="user_unregistered-text">
              If you dont have an account, signup right now and get started.
            </p>
            <button class="user_unregistered-signup" id="signup-button" @click="toggle('contactSales')" >
              Sign Up
            </button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">Have an account?</h2>
            <p class="user_registered-text">enter your details and login.</p>
            <button class="user_registered-login" @click="toggle('login')">Login</button>
          </div>

        </div>

        <div class="user_options-forms" v-bind:class="{'signup-click' : loginActive , 'login-click' : !loginActive }" id="user_options-forms">

          <!-- Login Page -->
          <div class="user_forms-login pt-5">
            <form class="forms_form" v-if="!forgotPasswordToggle" v-on:submit.prevent="login">
                <div class="forms_field">
                  <input type="email" maxlength='100' placeholder="Email" v-model="email" class="forms_field-input" required autofocus />
                </div>
                <div class="forms_field">
                  <input type="password" maxlength='100' placeholder="Password" v-model="password" class="forms_field-input" required />
                </div>
              <div class="forms_buttons">
                <button type="button" class="forms_buttons-forgot" @click="fpToggle">Forgot password?</button>
                <input type="submit" value="Log In" class="forms_buttons-action">
              </div>
            </form>
            <form class="forms_form mt-4" v-if="forgotPasswordToggle" v-on:submit.prevent="forgot">
                <div class="forms_field">
                  <input type="email" placeholder="Enter you email address" v-model="forgotEmail" class="forms_field-input" required autofocus />
                </div>
              <div class="forms_buttons">
                <button type="button" class="forms_buttons-forgot" @click="fpToggle">Login</button>
                <input type="submit" value="Send password reset link" class="forms_buttons-action">
              </div>
            </form>
          </div>

          <!-- signup Page -->
          <div class="user_forms-signup">
            <h2 class="forms_title mb-2">Fill your details</h2>
            <form class="forms_form" v-on:submit.prevent="signUpAction();">
                <div class="forms_field">
                  <input type="text" maxlength='50' placeholder="Full Name" v-model='signUp.requester_name' class="forms_field-input" required />
                </div>
                <div class="forms_field">
                  <input type="email" maxlength='50' placeholder="Email" v-model='signUp.email' class="forms_field-input" required />
                </div>
                <div class="forms_field">
                  <input type="text" maxlength='18' placeholder="Contact Number" v-model='signUp.contact_phone' class="forms_field-input" required />
                </div>
                <div class="forms_field">
                  <input type="text" maxlength='80' placeholder="Company" v-model='signUp.company_name' class="forms_field-input" required />
                </div>
              <div class="forms_buttons">
                <input type="submit" value="Sign Up" class="forms_buttons-action">
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable*/

export default {
  name: 'login',
  data() {
    return {
      disabled: false,
      loginActive: false,
      forgotPasswordToggle: false,
      email: null,
      forgotEmail: null,
      refreshing: false,
      password: null,
      signUp: {
        requester_name: '',
        email: '',
        contact_phone: '',
        company_name: '',
        ticket_type: 'Registration',
      },
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.getDataTemp();
      }
    },
    signUpAction() {
      /* eslint-disable no-unreachable */
      this.$http.post(`${process.env.BASE_URL}support/ticket/website`, this.signUp)
      .then(() => {
        this.$notify({
          group: 'foo',
          title: 'We have received your details, Someone from our team will contact you soon!',
          type: 'success',
        });
        this.toggle('login');
      }, () => {
        this.$notify({
          group: 'foo',
          title: 'There was some error!',
          type: 'warn',
        });
      });
    },
    forgot() {
      if (!this.forgotEmail) {
        this.$notify({
          group: 'foo',
          title: 'Please fill the email!',
          type: 'warn',
        });
        return;
      }
      this.$http.post(`${process.env.BASE_URL}password/reset/`, {
        email: this.forgotEmail,
      }).then(() => {
        this.$notify({
          group: 'foo',
          title: 'Reset link sent successfully, Please check your mailbox!',
          type: 'success',
        });
        this.email = JSON.parse(JSON.stringify(this.forgotEmail));
        this.forgotEmail = null;
        this.fpToggle();
      }, () => {
        this.$notify({
          group: 'foo',
          title: 'There was some error!',
          type: 'warn',
        });
      });
    },
    fpToggle() {
      this.forgotPasswordToggle = !this.forgotPasswordToggle;
    },
    toggle(e) {
      if (e === 'contactSales') {
        this.loginActive = true;
      } else {
        this.loginActive = !this.loginActive;
      }
    },
    getDataTemp(){
      this.$router.push('/home');
    },
    getData() {
      this.disabled = true;
      this.$http.post(process.env.API_URL, {
        username: this.email,
        password: this.password,
      }).then((response) => {
        this.refreshing = true;
        if (response.body && response.body.status === 200) {
          // If first time login
          if (response.body.last_login === null || response.body.profile_status === false) {
            if (response.body.last_login === null) {
              /* eslint-disable no-param-reassign */
              response.body.tempPassword = this.password;
              /* eslint-enable no-param-reassign */
            }
            const newBasicAuth = btoa(`${this.email}:${this.password}`);
            response.body.basicAuth = `Basic ${newBasicAuth}`;
            this.$store.dispatch('createTempSession', response.body);
            this.$router.push('/first-login');
          } else {
            const basicAuth = btoa(`${this.email}:${this.password}`);
            response.body.basicAuth = `Basic ${basicAuth}`;
            this.$store.dispatch('createSession', response.body);
            if (this.$route.query.redirect && this.$route.query.redirect !== undefined) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push('/dashboard');
            }
          }
        } else {
          this.disabled = false;
          this.refreshing = true;
          this.$notify({
            group: 'foo',
            title: 'Error while logging in!',
            type: 'warn',
            text: 'Wrong username or password.',
          });
        }
      }, (response) => {
        console.log(response);
      });
    },
    close(e) {
      e.stopPropogation();
      this.containerActive = !this.containerActive;
    },
  },
  beforeMount() {
    if (localStorage.getItem('CANXPUSER')) {
      this.$router.push('/dashboard');
    }
    if (this.$route.query.u && this.$route.query.p) {
      this.email = this.$route.query.u;
      this.password = atob(this.$route.query.p);
      this.getData();
    } else {
      this.refreshing = true;
    }
  },
};

</script>

<style lang="scss" scoped>
/* General variables */
/* General configurations */
* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

.refreshing {
  opacity: .3;
  pointer-events: none;
  user-select: none;
  cursor: no-drop;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type="submit"] {
  cursor: pointer;
}
input::-webkit-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::-ms-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

/* Animations */
@-webkit-keyframes bounceLeft {
  0% {
    -webkit-transform: translate3d(100%, -50%, 0);
            transform: translate3d(100%, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(-30px, -50%, 0);
            transform: translate3d(-30px, -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    -webkit-transform: translate3d(100%, -50%, 0);
            transform: translate3d(100%, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(-30px, -50%, 0);
            transform: translate3d(-30px, -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
  }
}
@-webkit-keyframes bounceRight {
  0% {
    -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(calc(100% + 30px), -50%, 0);
            transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(100%, -50%, 0);
            transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
  }
  50% {
    -webkit-transform: translate3d(calc(100% + 30px), -50%, 0);
            transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    -webkit-transform: translate3d(100%, -50%, 0);
            transform: translate3d(100%, -50%, 0);
  }
}
/* Page background */
.user {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  width: 100%;
  height: 100vh;
  // background: url("https://sonorangirl.github.io/Earth-Quotes/img/google-earth-view-mauritania.jpg") no-repeat center;
  // background: url("https://i.pinimg.com/originals/12/b8/e9/12b8e92aeffc0c32db7083b291730b09.jpg") no-repeat center;
  background: url("https://earthview.withgoogle.com/download/6344.jpg") no-repeat center;
  // background: url("https://s3.ap-south-1.amazonaws.com/hirexp/static/bacground-login.jpeg") no-repeat center;
  background-size: cover;
}
.user_options-container {
  position: relative;
  width: 80%;
}
.user_options-text {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

/* Registered and Unregistered user box and text */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

/* Login and signup forms */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
          box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  -webkit-transition: -webkit-transform 0.4s ease-in-out;
  transition: -webkit-transform 0.4s ease-in-out;
  transition: transform 0.4s ease-in-out;
  transition: transform 0.4s ease-in-out, -webkit-transform 0.4s ease-in-out;
  -webkit-transform: translate3d(100%, -50%, 0);
          transform: translate3d(100%, -50%, 0);
}
.user_options-forms .user_forms-login {
  -webkit-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #018674;
  letter-spacing: 0.1rem;
}
.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}
.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 0;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: black;
  letter-spacing: 0.1rem;
  -webkit-transition: border-color 0.2s ease-in-out;
  transition: border-color 0.2s ease-in-out;
}
.user_options-forms .forms_field-input:focus {
  border-color: gray;
}
.user_options-forms .forms_buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  margin-top: 35px;
}
.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  -webkit-transition: color 0.2s ease-in-out;
  transition: color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}
.user_options-forms .forms_buttons-action {
  background-color: #018674;
  // background-color: #e8716d;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  -webkit-transition: background-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-action:hover {
  background-color: #06ADAA;
  // background-color: #e14641;
}
.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, -webkit-transform 0.5s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, -webkit-transform 0.5s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out, -webkit-transform 0.5s ease-in-out;
}
.user_options-forms .user_forms-signup {
  -webkit-transform: translate3d(120px, 0, 0);
          transform: translate3d(120px, 0, 0);
}
.user_options-forms .user_forms-signup .forms_buttons {
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
}
.user_options-forms .user_forms-login {
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/* Triggers */
.user_options-forms.signup-click {
  -webkit-animation: bounceLeft 1s forwards;
          animation: bounceLeft 1s forwards;
}
.user_options-forms.signup-click .user_forms-signup {
  opacity: 1;
  visibility: visible;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.user_options-forms.signup-click .user_forms-login {
  opacity: 0;
  visibility: hidden;
  -webkit-transform: translate3d(-120px, 0, 0);
          transform: translate3d(-120px, 0, 0);
}
.user_options-forms.login-click {
  -webkit-animation: bounceRight 1s forwards;
          animation: bounceRight 1s forwards;
}
.user_options-forms.login-click .user_forms-signup {
  opacity: 0;
  visibility: hidden;
}
.user_options-forms.login-click .user_forms-login {
  opacity: 1;
  visibility: visible;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}

/* Responsive */
@media screen and (max-width: 620px) {
  .user_options-unregistered, .user_options-registered {
    display: none;
  }
  .user_options-forms {
    left: -100%;
    width: 100%;
  }
}
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 380px;
  }
  .user_options-forms .forms_buttons {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }
  .user_options-forms .user_forms-signup,
  .user_options-forms .user_forms-login {
    top: 50px;
  }

  .user_options-registered,
  .user_options-unregistered {
    padding: 50px 45px;
  }
}
/* eslint-enable*/
</style>
