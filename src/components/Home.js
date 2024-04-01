import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

class Home extends Component {
	render() {
		return (
			<div
				className='container-fluid d-flex justify-content-center align-items-center'
				style={{ height: '100vh' }}
			>
				<div>
					<div className='row'>
						<div className='col-md-6'>
							<Card className='h-100'>
								<Card.Img
									variant='top'
									src='Promptist.png'
									style={{
										height: '400px',
										objectFit: 'cover',
									}}
								/>
								<Card.Body className='d-flex flex-column'>
									<Card.Title>Promptist</Card.Title>
									<Card.Text>
										Enhance image generation with optimized
										Stable Diffusion prompts.
									</Card.Text>
									<Button
										as={Link}
										to='/promptist'
										variant='primary'
										className='mt-auto'
									>
										Generate Images
									</Button>
								</Card.Body>
							</Card>
						</div>
						<div className='col-md-6'>
							<Card className='h-100'>
								<Card.Img
									variant='top'
									src='prompt-discovery-thumbnail.png'
									style={{
										height: '400px',
										objectFit: 'cover',
									}}
								/>
								<Card.Body className='d-flex flex-column h-10'>
									<Card.Title>Prompt Discovery</Card.Title>
									<Card.Text>
										Unravel the original prompts from AI
										generated images.
									</Card.Text>
									<Button
										as={Link}
										to='/prompt-discovery'
										variant='primary'
										className='mt-auto'
									>
										Discover Prompts
									</Button>
								</Card.Body>
							</Card>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
