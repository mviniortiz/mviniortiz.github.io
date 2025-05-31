// Estrutura preparada para migração React
const ProjectCard = ({ project, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const cardRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), index * 100);
                }
            },
            { threshold: 0.1 }
        );
        
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        
        return () => observer.disconnect();
    }, [index]);
    
    return (
        <div 
            ref={cardRef}
            className={`project-card ${isVisible ? 'animate-in' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <img 
                src={project.image}
                alt={project.title}
                className={`project-image ${imageLoaded ? 'loaded' : ''}`}
                onLoad={() => setImageLoaded(true)}
            />
            {/* Resto do componente */}
        </div>
    );
};