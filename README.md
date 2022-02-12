# Viiny-Form
##### Create a form with multiple steps.

## Usage
#### Create an instance
```
new ViinyForm('.form-wrapper');
```
OR
```
new ViinyForm('.form-wrapper', {
    'nextButtonClass': 'btn-next',
    'prevButtonClass': 'btn-prev',
    'onComplete': () => {
        console.log("completed");
    }
});
```

## Events and Customizations
| Name | Description |
| ---- | ----------- | 
| onInit | when form initialize completed. |
| onBeforeNext | triggered just before going to the next step. |
| onNext | triggered when going to next step.  |
| onBeforePrev | triggered just before going to the previous step. |
| onPrev | triggered when going to previous step. |
| onInvalid | triggered if the form is invalid. |
| onComplete | triggered if all forms are valid |
| nextButtonClass | set the next button class for selector |
| prevButtonClass | set the previous button class for selector |

## Events
#### onBeforeNext
**Parameters**

`{ number } currentFormIndex`

`{ object } form`

`return` **True** or **False**

------
#### onNext
**Parameters**

`{ number } currentFormIndex`

`{ object } form`

------
#### onBeforePrev
**Parameters**

`{ number } currentFormIndex`

`{ object } form`

`return` **True** or **False**

------
#### onPrev
**Parameters**

`{ number } currentFormIndex`

`{ object } form`

------
#### onInvalid
**Parameters**

`{ number } currentFormIndex`

`{ object } form`

------
#### onComplete
**Parameters**

`{ number } currentFormIndex`

`{ object } form`
