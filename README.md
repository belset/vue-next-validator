# vue-next-validator

Javascript library of _server-side_ and/or _client-side_ validation for _*Vue 3*_ applications implemented with help of the Composition API hooks.

### 🔥 Only one function does all work to validate your data!

```ts
function validate(conditions, source, callback, options = { delay: 500 });
```
* `conditions` - it allows to detect the moment when your data are ready to be validated;
for example: the field in a form may be empty so that you don't need to validate it;
'conditions' source must be a getter function that returns a value, or directly a ref;
* `source` - a getter function or directly a ref to data which should be validated;
* `callback` - a user's function that will do a vlidation;
              it will called from vue-next-validator as *callback(value, fnValid, fnInvalid)*;
* `options` - if delay = 0, validation will be called immediately.

#
### 🚀 ***Have a look at the [INTERACTIVE DEMO](https://belset.github.io/vue-next-validator/demo-package/dist/)***, there are also _[source codes](https://github.com/belset/vue-next-validator/tree/master/demo-package)_ of the demo project
#
[![demo](https://raw.githubusercontent.com/belset/vue-next-validator/master/working.gif)](https://raw.githubusercontent.com/belset/vue-next-validator/master/working.gif)

&nbsp;
## ⚡ Usage

### Vue template

```html
<div>
  <input type="text" v-model="state.user"/>
  <div>  
    <span v-if="validation.user.valid">User is valid</span>
    <span v-else-if="validation.user.invalid">User is invalid</span>
    <span v-else-if="validation.user.validating">Validating...</span>
  </div>
</div>
```

### Javascript

```ts
import { validate, isEmail } from 'vue-next-validator'

export default {
    
  setup() {
    const state = reactive({
      user: null,
      email: null
    });

    const validation = {
      
      // server-side validation
      user: validate(
        () => state.user.length > 2,  // is it time to start a validation or not?
        () => state.user,             // 'state.user' is a value that has to be validated
        (value, valid, invalid) => {  
          const data = await fetchData(`https://api.server.com/?name=${value}`);
          if (data.count > 0)
            valid({ name: value, count: data.count });
          else
            invalid({ name: value });
        }
      ),

      // client-side validation
      email: validate(() => state.email, () => state.email, isEmail, { delay: 0 }),

      // validation based on other validations
      isOkEnabled: () => validation.user.valid && validation.email.valid
    };

    return {
      state, validation
    };
  }
}
```

### 🔸 Customizing 

Normally you will write your own `callback` function to do any custom validation. You can use all possibilities the JavaScript provides - database or another API requests, modal windows, etc.

```ts
....
  my_longFormat_Validator: 
      validate(
            () => state && state.number,    // pre-validation conditions
            () => state.number,             // value that has to be validated
            (value, valid, invalid) => 
                (value.length > 10) ? valid('Correct!') : invalid('Too short!')
      ),
  my_shortFormat_Validator:
      validate(
            () => state && state.phone,    // pre-validation conditions
            () => state.phone,             // value that has to be validated
            (value) => (value === '2128506')
      )
```
If the `callback` function returns `true`, it will mean the validation has finished. This is a short format of your custom `callback` function.

Otherwise, the `valid` / `invalid` function must be called inside of your `callback` to finish the validation.<br>
You can pass any data through `valid` or `invalid` to analyze it in the source codes or on the markup level.

### 🔸 Pre-defined client-side functions

```ts
export const isInt = (val) => val != "" && !isNaN(val) && Math.round(val) == val;
export const isFloat = (val) => val != "" && !isNaN(val) && Math.round(val) != val;
export const isCurrency = (val) => /^\d+(?:\.\d{0,2})$/.test(val);
export const isDigit = (val) => /^\d*$/.test(val);
export const isUrl = (val) => /.....?/.test(val);
export const isEmail = (val) => /.....$/.test(val);
```

These most commonly used functions for ***client-side*** validation ave been added into the package. Just import it to use together with the _validate(....)_ function 
```ts
import { validate, isEmail, isUrl, ... } from 'vue-next-validator'
```

&nbsp;
## 📦 Install

```bash
npm i vue-next-validator
```

&nbsp;
## 🌍 CDN

It is not implemented yet.

&nbsp;
## 🧱 Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change

&nbsp;
## 📄 License

MIT © [@belset/vue-next-validator](https://github.com/belset/vue-next-validator/blob/master/LICENSE)

&nbsp;
## 🙏 Thanks

Thanks will be enough
