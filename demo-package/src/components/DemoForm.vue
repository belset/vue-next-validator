<template>
  <div class="max-w-xl p-6 mx-auto border border-gray-300">
      <form action="">

        <div class="">
          <label for="chkEnableValidation" class="flex items-center justify-start cursor-pointer">
            <div class="relative">
              <input type="checkbox" id="chkEnableValidation" class="sr-only" v-model="state.enableValidation" />
              <div class="block w-10 h-6 bg-white border border-gray-500 rounded-full"></div>
              <div class="absolute w-4 h-4 transition bg-gray-300 rounded-full dot left-1 top-1"></div>
            </div>
            <div v-if="!state.enableValidation" class="ml-3 font-semibold text-gray-700">
              Toggle it to <span class="text-blue-500">SWITCH ON</span> a validation
            </div>
            <div v-if="state.enableValidation" class="ml-3 font-semibold text-gray-700">
              Validation is working now
            </div>
          </label>
        </div>

        <div class="mt-5 text-left text-gray-700">
          <label class="mb-1" for="nameInput">Type a <b class="text-gray-600">&nbsp;username&nbsp;</b> to check it on the server side</label>
          <div class="relative">
            <input type="text" id="nameInput" v-model="state.formData.user" autocomplete="off" spellcheck="false" 
              :class="{'border-green-500': validators.user.valid, 'border-red-500': validators.user.invalid }"
              class="w-full h-10 pl-3 pr-10 text-base placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:shadow-inner"/>
            
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg v-if="validators.user.valid" class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <svg v-else-if="validators.user.invalid" class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <svg v-else-if="validators.user.validating" class="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>

          <span v-if="validators.user.valid" class="text-xs text-green-600">The username '<b>{{validators.user.data.name}}</b>' found on the server <b>{{validators.user.data.count}}</b> times</span>
          <span v-else-if="validators.user.invalid" class="text-xs text-red-600">Username not found</span>
          <span v-else-if="validators.user.validating" class="text-xs text-blue-500">Validating...</span>
          <span v-else class="text-xs text-white">&nbsp;</span>
        </div>
        
        <div class="relative mt-0 text-left text-gray-700">
          <label class="mb-1" for="emailInput">Type an <b class="text-gray-600">&nbsp;email&nbsp;</b> to check it on the client side</label>
          <input type="text" id="emailInput" v-model="state.formData.email" autocomplete="off" spellcheck="false"
            :class="{'border-green-700': validators.email.valid, 'border-red-700': validators.email.invalid }"
            class="w-full h-10 px-3 text-base placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:shadow-inner"/>
          
          <span v-if="validators.email.valid" class="text-xs text-green-600">Email is valid</span>
          <span v-else-if="validators.email.invalid" class="text-xs text-red-600">Invalid email</span>
          <span v-else class="text-xs text-white">&nbsp;</span>

          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg v-if="validators.email.valid" class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <svg v-else-if="validators.email.invalid" class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
          </div>
        </div>

        <div class="text-right field">
          <button type="button" :disabled="!validators.buttonOK()" :class="{ 'opacity-50': !validators.buttonOK() }"
            class='relative w-32 py-2 overflow-hidden text-xl font-bold text-white bg-blue-500 rounded'>
            OK
          </button>
        </div>
        
      </form>
    </div>
</template>

<script>
  import { reactive } from 'vue'
  import { validate, isEmail } from 'vue-next-validator'

  export default {
    setup() {
      const state = reactive({
        enableValidation: false,
        formData: {
          user: null,
          email: null
        }
      });

      const validators = {
        user: validate(
          () => state.enableValidation && state.formData.user,
          () => state.formData.user, (value, valid, invalid) => {
            fetch(`https://api.agify.io/?name=${encodeURIComponent(value)}`)
              .then(res => res.json())
              .then((data) => {       // data: { age: 61, count: 13824, name: "bill"}
                if (data.count > 0)
                  valid({ name: value, count: data.count });
                else
                  invalid({ name: value });
              });
          }, { delay:1200, immediate:false }),

        email: validate(() => state.enableValidation && state.formData?.email, () => state.formData.email, isEmail, { delay: 0 }),

        buttonOK: () =>
          state.enableValidation && validators.user.valid && validators.email.valid
      };

      return {
        state, validators
      };

    }
  }
</script>

<style scoped>
    input:checked~.dot {
      transform: translateX(100%);
      background-color: rgba(147, 197, 253, var(--tw-bg-opacity));
      --tw-bg-opacity: 1;
    }

    .ribbon {
      position: absolute;
      top: 0;
      right: 0;
      width: 150px;
      height: 22px;
      margin-right: -50px;
      margin-top: 15px;
      -ms-transform: rotate(45deg); /* IE 9 */
      -webkit-transform: rotate(45deg); /* Safari prior 9.0 */
      transform: rotate(45deg); /* Standard syntax */
    }

</style>
