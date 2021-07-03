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


### 🚀 ***Have a look at the [INTERACTIVE DEMO](https://belset.github.io/vue-next-validator/demo-package/dist/)***, are also provided - _[click here](https://github.com/belset/vue-next-validator/tree/master/demo-package)_ 

#
[![demo](https://raw.githubusercontent.com/belset/vue-next-validator/master/working.gif)](https://raw.githubusercontent.com/belset/vue-next-validator/master/working.gif)
#

&nbsp;
## ⚡ Usage

Link to the list of the [pre-defined functions](#injected-functions) which are injected into the package. These functions may be used for `client-side validation` only!

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
          const data = await fetchData(`https://api.server.com/n=?${value}`);
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

### Injected functions
```ts
export const isInt = (val) => val != "" && !isNaN(val) && Math.round(val) == val;
export const isFloat = (val) => val != "" && !isNaN(val) && Math.round(val) != val;
export const isCurrency = (val) => /^\d+(?:\.\d{0,2})$/.test(val);
export const isDigit = (val) => /^\d*$/.test(val);
export const isUrl = (val) => /...?/.test(val);
export const isEmail = (val) => /...$/.test(val);
```
These functions are added in the package, just import it and use together with the _validate(....)_ function 
```ts
import { validate, isEmail, isUrl, ... } from 'vue-next-validator'
```

You can also write your own `callback` function to do any custom validation. It's the best way, you will have no any restrictions, you can use all possibilities the JavaScript provides - call database or another API, open modal windows, etc.

If the `callback` function returns `true`, it will mean the validation is finished. It is short format of you custom function.
Otherwise, the `valid` or `invalid` function must be called inside of your `callback` to finish validation. 
You can pass any data through `valid` or `invalid` to analyze it on the marckup level or source codes.

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
            (value) => (value == '2128506')
      )
....
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

Thanks will be enough 🙏
