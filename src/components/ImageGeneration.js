import React, { useState } from 'react';
import './PromptistPage.css'; // Import CSS for styling
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const PromptistPage = () => {
	const [userInput, setUserInput] = useState('');
	const [optimizedPrompt, setOptimizedPrompt] = useState('');
	const [originalImage, setOriginalImage] = useState('Promptist.png');
	const [optimizedImage, setOptimizedImage] = useState('Promptist.png');
	const [loading, setLoading] = useState(false);

	const handleInputChange = (event) => {
		setUserInput(event.target.value);
	};

	const optimizePrompt = async () => {
		setLoading(true);
		fetch('http://213.173.98.21:8000/optimize-prompt-stable-diffusion/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt: userInput,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const optimizePrompt = data.optimized_prompt;
				setOptimizedPrompt(optimizePrompt);
			})
			.catch((error) => {
				console.error('Error Optimizing Prompt', error);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const generateImages = () => {
		setLoading(true);
		fetch('http://213.173.98.21:8000/generate-image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt: userInput,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const imageBytes = data.image_bytes;
				const dataURL = 'data:image/png;base64,' + imageBytes;
				setOriginalImage(dataURL);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});

		fetch('http://213.173.98.21:8000/generate-image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt: optimizedPrompt,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const imageBytes = data.image_bytes;
				const dataURL = 'data:image/png;base64,' + imageBytes;
				setOptimizedImage(dataURL);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='main-page-container'>
			<h1>Image Generation</h1>
			<div className='image-container'>
				<div className='col-md-6'>
					<Card>
						<Card.Img
							variant='top'
							src={originalImage}
							style={{
								height: '400px',
								objectFit: 'cover',
							}}
						/>
						<Card.Body className='d-flex flex-column card-text'>
							<Card.Title>Original Prompt</Card.Title>
							<Card.Text>{userInput}</Card.Text>
						</Card.Body>
					</Card>
				</div>

				<div className='col-md-6'>
					<Card>
						<Card.Img
							variant='top'
							src={optimizedImage}
							style={{
								height: '400px',
								objectFit: 'cover',
							}}
						/>
						<Card.Body className='d-flex flex-column card-text'>
							<Card.Title>Optimized Prompt</Card.Title>
							<Card.Text>{optimizedPrompt}</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</div>

			<div className='input-container'>
				<div className='text-container'>
					<input
						type='text'
						value={userInput}
						onChange={handleInputChange}
					/>
					<div className='btn-container'>
						<button onClick={optimizePrompt}>Optimize</button>
						<button onClick={generateImages}>Generate</button>
					</div>
				</div>
			</div>

			{loading && (
				<div className='loader-spinner'>
					<ClipLoader
						color='#000000'
						loading={loading}
						cssOverride={{
							display: 'block',
							margin: '0 auto',
							borderColor: 'black',
						}}
						size={150}
						aria-label='Loading Spinner'
						data-testid='loader'
					/>
				</div>
			)}
		</div>
	);
};

export default PromptistPage;
