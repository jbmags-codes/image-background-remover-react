export default function Footer() {
    return (
        <footer className="border-t">
            <div className="flex flex-col items-center gap-y-5 pt-12 pr-5 pb-20 pl-5">
                <p className="font-medium text-[0.6875rem] xs:text-[0.8125rem] text-center">&copy; Copyright 2025. Designed and built by jbmags.</p>
                <div className="flex justify-center gap-8 p-0">
                    <a href="https://www.linkedin.com/in/jbmagx/" target="_blank">
                        <img src="/linkedin.svg" alt="Linkedin logo" width={36} height={36} />
                    </a>

                    <a href="https://github.com/jbmagx" target="_blank">
                        <img className="dark:invert" src="/github.svg" alt="GitHub logo" width={36} height={36} />
                    </a>

                    <a href="mailto:jbmagx@gmail.com" target="_blank">
                        <img src="/gmail.svg" alt="Gmail logo" width={36} height={36} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
