import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageHandler from './ImageHandler';

// Mocking the fetch function to simulate backend response
beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([{ id: 1, imageName: 'test.jpg' }]), // Simulate backend response data
        })
    );
});

describe('ImageHandler component', () => {
    it('should fetch and render images from the backend', async () => {
        render(<ImageHandler />);

        // Wait for the fetch call to complete
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

        // Assert that the image is rendered
        const imageElement = screen.getByAltText('Uploaded');
        expect(imageElement).toBeInTheDocument();

        // Assert that the correct image URL is used
        expect(imageElement).toHaveAttribute(
            'src',
            'http://localhost:8080/images/test.jpg'
        );
    });
});
