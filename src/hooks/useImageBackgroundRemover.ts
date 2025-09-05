import { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';

export default function useImageBackgroundRemover() {
    const [imageName, setImageName] = useState('');
    const [originalImage, setOriginalImage] = useState('/fallback.png');
    const [processedImage, setProcessedImage] = useState('');
    const [removingBackground, setRemovingBackground] = useState(false);

    // Function to handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemovingBackground(true);
        setProcessedImage('');

        // Get the selected file(s)
        const file = event?.target?.files?.[0];

        if (!file) {
            setRemovingBackground(false);
            alert('No file selected. Please upload an image.');
            return;
        }

        // Check if a file was selected
        if (!file) {
            setRemovingBackground(false);
            alert('No file selected. Please upload an image.');
            return;
        }

        // Validate if the file is an image
        if (!file.type.startsWith('image/')) {
            setRemovingBackground(false);
            alert('Invalid file type. Please upload an image.');
            return;
        }

        // Update the image name
        setImageName(file.name.split('.')[0]);

        // Read the file
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setOriginalImage(reader.result); // Only assign if it's a string
                handleBackgroundRemoval(reader.result);
            } else {
                alert(`Unexpected FileReader result type: ${typeof reader.result}`);
                console.error('Unexpected FileReader result type:', typeof reader.result);
            }
        };

        reader.readAsDataURL(file);
    };

    const handleBackgroundRemoval = async (readerResult: string) => {
        try {
            const blob = await removeBackground(readerResult);
            const reader = new FileReader();

            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setProcessedImage(reader.result); // Ensure it's a string
                } else {
                    alert(`Unexpected FileReader result type: ${typeof reader.result}`);
                    console.error('Unexpected FileReader result type:', typeof reader.result);
                }
            };

            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error removing background:', error);
        } finally {
            setRemovingBackground(false);
        }
    };

    return {
        imageName,
        originalImage,
        processedImage,
        removingBackground,
        handleImageUpload,
    };
}
