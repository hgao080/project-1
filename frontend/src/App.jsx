import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import Login from './pages/Login';
import CompetitionTest from './pages/CompetitionTest';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/'>
			<Route index element={<Home />} />
			<Route path='signup' element={<SignUp />} />
			<Route path='login' element={<Login />} />
			<Route path='admin' element={<Admin />} />
			<Route path='competition/:eventId' element={<CompetitionTest />} />

			<Route path='*' element={<NotFound />} />
		</Route>
	)
);

function App() {
	return (
		<div>
			<RouterProvider router={router} />
			<Toaster />
		</div>
	);
}

export default App;
