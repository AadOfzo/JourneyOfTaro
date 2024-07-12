import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.get('localhost:8080/images', (req, res, ctx) => {
        return res(ctx.json([
            { id: 1, imageName: 'image1.jpg', imageAltName: 'Alt 1', imageUrl: 'http://example.com/image1.jpg' },
            { id: 2, imageName: 'image2.jpg', imageAltName: 'Alt 2', imageUrl: 'http://example.com/image2.jpg' }
        ]));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders images from backend', async () => {
    render(<App />);

    // Wait for images to be loaded
    const image1 = await screen.findByAltText('Alt 1');
    const image2 = await screen.findByAltText('Alt 2');

    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
});
