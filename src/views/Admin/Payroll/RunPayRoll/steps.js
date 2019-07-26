import React from 'react'
import {StepOne} from './StepOne'
import {StepTwo} from './StepTwo'
import {StepThree} from './StepThree'
import {StepFour} from './StepFour'
const steps = 
[
    {name: 'Hours & Earnings', component: <StepOne/>},
    {name: 'Time Off', component: <StepTwo/>},
    {name: 'Review & Submit', component: <StepThree/>},
    {name: 'Confirmation', component: <StepFour/>}
]
export {steps}