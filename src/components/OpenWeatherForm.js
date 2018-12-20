import React from "react";

import { BasicButton, BasicInput } from '../styles.js';

const Form = props => (
	<form onSubmit={props.getWeather}>
		<BasicInput type="text" name="city" placeholder="City..."/>
		<BasicInput type="text" name="country" placeholder="Country..."/>
		<BasicButton>Get Weather</BasicButton>
	</form>
);

export default Form;