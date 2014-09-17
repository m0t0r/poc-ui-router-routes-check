poc-ui-router-routes-check
==========================

Simple POC how to check routes with ui-router


## Install

Run

* npm install
* bower install


In order to quickly check just run:

```
python -m SimpleHTTPServer 8000
```
and the go to ```http://localhost:8000/#/```

Use:
```
user:user - 'login' as a user role
admin:admin - 'login' as a admin role
```
Trying to click on a link which takes to admin route will ```fail for user``` and ```work for admin.```

## Test

In order to check tests run 

```
npm test
```

## Licence

MIT.