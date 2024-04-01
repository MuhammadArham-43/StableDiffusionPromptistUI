import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './components/Home';
import PromptDiscovery from './components/PromptDiscovery';
import PromptistPage from './components/ImageGeneration';

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route
					exact
					path='prompt-discovery'
					element={<PromptDiscovery />}
				/>
				<Route exact path='promptist' element={<PromptistPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
