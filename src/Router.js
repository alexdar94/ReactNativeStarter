import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import TopMoviesScene from './components/containers/TopMoviesScene';

class RouterComponent extends Component {

	render(){
		return (
			<Router sceneStyle={{paddingTop: 65}}>
				<Scene key="root">
					<Scene key="topMovies" initial component={TopMoviesScene} title="Top Movies" />
				</Scene>
			</Router>
		);
	}
}

export default RouterComponent;