import { techStack } from '@/constants/tech-stack';
import { cn } from '@/lib/utils';
import { Compare } from '@/components/aceternity/compare';
import { Button } from '@/components/custom/Button';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useImageBackgroundRemover from '@/hooks/useImageBackgroundRemover';

export default function App() {
    return (
        <main className="flex flex-col w-full">
            <Header />

            <div className="flex flex-col w-full py-10 xs:py-12 sm:py-14 md:py-20 px-6">
                <div className="flex flex-col items-center w-full gap-y-10 max-w-166 mx-auto min-h-[calc(100vh-16.75rem)]">
                    <Title />
                    <ImageBackgroundRemover />
                    <Description />
                    <TechStack />
                    <GitHubRepo />
                </div>
            </div>

            <Footer />
        </main>
    );
}

function Title() {
    return <h2 className="font-semibold text-xl text-center">Image Background Remover</h2>;
}

function ImageBackgroundRemover() {
    const { imageName, originalImage, processedImage, removingBackground, handleImageUpload } = useImageBackgroundRemover();

    return (
        <div className="flex flex-wrap items-center justify-center w-full gap-5" aria-busy={removingBackground} aria-live="polite">
            <Image originalImage={originalImage} processedImage={processedImage} />

            <div className="flex flex-wrap md:items-center md:flex-col max-w-xs w-full gap-y-3.5 xs:gap-y-4 xs:gap-x-3.5 sm:gap-x-4 md:gap-x-0">
                <ImageInput onChange={handleImageUpload} disabled={removingBackground} />
                <DownloadButton imageName={imageName} originalImage={originalImage} processedImage={processedImage} removingBackground={removingBackground} />
            </div>
        </div>
    );
}

function Image({ originalImage, processedImage }: ImageProps) {
    return (
        <div className="flex w-full flex-col max-w-xs max-h-92">
            {processedImage && (
                <Compare
                    firstImage={originalImage}
                    secondImage={processedImage}
                    firstImageClassName="object-contain rounded-lg"
                    secondImageClassname="object-contain rounded-lg"
                    className="w-full h-80 xs:h-92 rounded-lg bg-[#d5d4d9]"
                    slideMode="hover"
                />
            )}

            {(originalImage === '/fallback.png' || !processedImage) && (
                <img src={originalImage} alt="Image background remover" className="w-full h-80 xs:h-92 rounded-xl object-contain bg-[#d5d4d9]" />
            )}
        </div>
    );
}

function ImageInput({ onChange, disabled }: ImageInputProps) {
    return (
        <div className="flex items-center justify-center w-full xs:w-[calc(50%-0.5rem)] md:w-64">
            <label
                htmlFor="imageFileInput"
                className={cn(
                    'flex items-center justify-center cursor-pointer h-10 w-full px-6 bg-blue-600 font-medium text-white rounded-lg shadow-sm text-sm hover:opacity-80 duration-300 select-none',
                    disabled && 'opacity-50 hover:opacity-50 cursor-not-allowed'
                )}
                aria-label="Upload an image to remove the background"
            >
                Upload Image
            </label>
            <input
                id="imageFileInput"
                type="file"
                accept="image/*"
                onChange={onChange}
                disabled={disabled}
                className="hidden"
                aria-label="Choose an image file"
                aria-describedby="upload-instructions"
            />
        </div>
    );
}

function DownloadButton({ imageName, originalImage, processedImage, removingBackground }: DownloadButtonProps) {
    return (
        <a
            href={processedImage}
            download={`${imageName}-background-removed.png`}
            className="flex items-center justify-center h-fit w-full xs:w-[calc(50%-0.5rem)] md:w-64"
            onClick={(event) => {
                if (!processedImage || removingBackground) event.preventDefault();
            }}
        >
            <Button
                variant="ghost"
                color="primary"
                className="w-full h-10 font-medium rounded-lg shadow-sm"
                disabled={!processedImage || removingBackground}
                aria-disabled={!processedImage || removingBackground}
                aria-live="assertive"
            >
                {(originalImage !== '/fallback.png' && !processedImage) || removingBackground ? <Loader2 className="animate-spin" /> : 'Download'}
            </Button>
        </a>
    );
}

function Description() {
    return (
        <p className="text-sm">
            This image background remover, built with React, lets you easily remove backgrounds from your images using the @imgly/background-removal npm package. The entire process
            runs locally in your browser, ensuring that your images are never uploaded to a server. This makes it a safe and secure option for protecting your privacy.
        </p>
    );
}

function TechStack() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mx-auto">
            <div className="self-center font-semibold uppercase text-sm tracking-tight">Tech Stack:</div>
            <div className="flex flex-wrap align-center justify-center gap-2">
                {techStack.map((tech, index) => (
                    <a key={index} href={tech.link} target="_blank" className={`${tech.color} flex items-center justify-center font-medium text-xs rounded-sm h-5 px-1.5`}>
                        {tech.name}
                    </a>
                ))}
            </div>
        </div>
    );
}

function GitHubRepo() {
    return (
        <a
            href="https://github.com/jbmags-codes/image-background-remover-react"
            target="_blank"
            className={cn('flex items-center justify-center gap-x-2 px-8 h-12 w-fit rounded-full bg-[#0A7EA4]')}
        >
            <span className="text-white text-sm font-semibold uppercase">Project Repository</span>
            <img src="/github.svg" alt="GitHub logo" width={32} height={32} className="invert" />
        </a>
    );
}
