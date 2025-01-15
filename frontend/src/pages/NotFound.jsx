import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className='w-screen h-screen bg-homeBg bg-no-repeat bg-center bg-cover p-20'>
			<div className='flex flex-col m-auto w-fit'>
				<h1 className='text-8xl font-main font-bold'>
					Page not found!
				</h1>
				<p className='font-main text-6xl'>
					Just use the buttons, they work.
				</p>
				<p className='mt-12 text-6xl font-main'>
					Go to the <Link to='/' className='underline decoration-2'> Homepage </Link>.
				</p>
			</div>
		</div>
	);
};

export default NotFound;
