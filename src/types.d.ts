type ImageProps = {
    originalImage: string;
    processedImage: string;
};

type ImageInputProps = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
};

type DownloadButtonProps = {
    imageName: string;
    originalImage: string;
    processedImage: string;
    removingBackground: boolean;
};
