import React, { useState } from 'react'

import axiosWithAuth from '../utils/axiosWithAuth'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import {
    Input,
    Select,
    Button,
    Form,
    SelectContainer,
    FormAlign,
    HeaderDiv,
} from './formStyles'

const EditClasses = (props) => {
    const [formState, setFormState] = useState({
        id: props.details.id,
        classname: props.details.classname,
        date: props.details.date,
        time: props.details.time,
        duration: props.details.duration,
        classtype: props.details.classtype,
        intensityLevel: props.details.intensityLevel,
        location: props.details.location,
        currentAttendeesNo: props.details.currentAttendeesNo,
        maxsize: props.details.maxsize,
    })

    const inputChange = e => {
        e.persist()
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth(formState.id).put(`/instructor/classes/${formState.id}`, formState)
            .then((res) => { window.location.reload() })
            .catch(err => { console.log(err) })
    }

    return (
        <div>

            <Form onSubmit={formSubmit}>
                <FormAlign>
                    <HeaderDiv>
                        <h2>Edit Class</h2>
                    </HeaderDiv>
                    <label htmlFor="classname">
                        <SelectContainer>
                            Class name:
                        <Input
                                type="text"
                                name="classname"
                                id="classname"
                                placeholder="Create Class Name"
                                value={formState.classname}
                                onChange={inputChange}
                            />
                        </SelectContainer>
                    </label>

                    <label htmlFor="date">
                        <SelectContainer>
                            Date:
                        <Input
                                type="text"
                                name="date"
                                id="date"
                                placeholder="Enter Date"
                                value={formState.date}
                                onChange={inputChange}
                            />
                        </SelectContainer>
                    </label>
                    <label htmlFor="duration">
                        <SelectContainer>
                            Duration:
                        <Select
                                value={formState.duration}
                                name="duration"
                                id="duration"
                                onChange={inputChange}>
                                <option value="">N/A</option>
                                <option value=".5h">30 minutes</option>
                                <option value="1h">1 hour</option>
                                <option value="1.5h">1 1/5 hours</option>
                                <option value="2h">2 hours</option>
                            </Select>
                        </SelectContainer>
                    </label>
                    <label htmlFor="classtype">
                        <SelectContainer>
                            Type:
                        <Select
                                value={formState.classtype}
                                name="classtype"
                                id="classtype"
                                onChange={inputChange}>
                                <option value="">N/A</option>
                                <option value="Cardio">Cardio</option>
                                <option value="Legs">Legs minutes</option>
                                <option value="Arms">Arms</option>
                                <option value="Chest">Chest</option>
                                <option value="Yoga">Yoga</option>
                                <option value="Zumba">Zumba</option>
                                <option value="Turbo-Kick">Turbo-Kick</option>
                            </Select>

                        </SelectContainer>
                    </label>
                    <label htmlFor="intensityLevel">
                        <SelectContainer>
                            Intensity:
                        <Select
                                value={formState.intensityLevel}
                                name="intensityLevel"
                                id="intensityLevel"
                                onChange={inputChange}>
                                <option value="">N/A</option>
                                <option value="Beginner">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                                <option value="Psychopath">Psychopath</option>
                            </Select>
                        </SelectContainer>
                    </label>
                    <label htmlFor="location">
                        <SelectContainer>
                            Location:
                        <Select
                                value={formState.location}
                                name="location"
                                id="location"
                                onChange={inputChange}>
                                <option value="">N/A</option>
                                <option value="Anywhere Fitness">Anywhere Fitness</option>
                                <option value="Somewhere Else">Somewhere Else</option>

                            </Select>
                        </SelectContainer>
                    </label>
                    <label htmlFor="currentAttendeesNo">
                        <SelectContainer>
                            Current:
                        <Input
                                type="number"
                                name="currentAttendeesNo"
                                id="currentAttendeesNo"
                                placeholder="0"
                                value={formState.currentAttendeesNo}
                                onChange={inputChange}
                            />
                        </SelectContainer>
                    </label>
                    <label htmlFor="maxsize">
                        <SelectContainer>
                            Maximum:
                        <Input
                                type="number"
                                name="maxsize"
                                id="maxsize"
                                placeholder="0"
                                value={formState.maxsize}
                                onChange={inputChange}
                            />
                        </SelectContainer>
                    </label>
                </FormAlign>
                <Button disabled={false} onClick={() => ToastsStore.success(`Edit Submitted`)}>Confirm Edit</Button>
                <ToastsContainer store={ToastsStore} />
            </Form>

        </div>
    )
}
export default EditClasses;