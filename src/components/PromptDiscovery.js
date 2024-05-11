import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import './DiscoverPage.css';
import ClipLoader from 'react-spinners/ClipLoader';

function PromptDiscovery() {
	const [file, setFile] = useState(null);
	const [discoveredPrompt, setDiscoveredPrompt] = useState('');
	const [loading, setLoading] = useState(false);
	const [genImageSrc, setGenImageSrc] = useState(null);
	const fileTypes = ['JPEG', 'PNG', 'GIF'];
	const API_URL = process.env.REACT_APP_API_URL;

	const handleChange = async (file) => {
		setFile(file);
		setGenImageSrc(null);
		setDiscoveredPrompt('');
		setLoading(true);
		const formData = new FormData();
		formData.append('image', file);
		fetch(`${API_URL}/discover-prompt/`, {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const prompt = data.discoveredPrompt;
				setDiscoveredPrompt(prompt);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const generateImage = async () => {
		setLoading(true);
		fetch(`${API_URL}/generate-image`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt: discoveredPrompt,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const imageBytes = data.image_bytes;
				const dataURL = 'data:image/png;base64,' + imageBytes;
				setGenImageSrc(dataURL);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleInputChange = (event) => {
		setDiscoveredPrompt(event.target.value);
	};

	return (
		<div
			className='container-fluid d-flex justify-content-center align-items-center'
			style={{ height: '100vh' }}
		>
			<div className='main-container'>
				<h1>Prompt Discovery</h1>
				<div className='images-container'>
					{file && (
						<div>
							<img
								src={URL.createObjectURL(file)}
								alt='Uploaded'
								style={{
									width: '512px',
									height: '512px',
								}}
							/>
						</div>
					)}
					<div className='gen-image-container'>
						{genImageSrc && (
							<img
								src={genImageSrc}
								style={{
									width: '512px',
									height: '512px',
								}}
							/>
						)}
					</div>
				</div>
				<div>
					<FileUploader
						multiple={false}
						handleChange={handleChange}
						name='file'
						types={fileTypes}
						className='fileUploader'
					/>
				</div>
			</div>

			<div className='input-container'>
				<div className='text-container'>
					<input
						type='text'
						value={discoveredPrompt}
						readOnly={false}
						onChange={handleInputChange}
					/>
					<div className='btn-container'>
						<button onClick={generateImage}>Compare Image</button>
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
}

export default PromptDiscovery;
