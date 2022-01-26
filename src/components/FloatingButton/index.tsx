import "./style.scss";

interface FloatingButtonI {
    action: () => void;
}

const FloatingButton = ({ action }: FloatingButtonI) => {
    return (
        <div className="floating_button_container" onClick={action}>
            <div className="horizontal-plus"></div>
            <div className="vertical-plus"></div>
        </div>
    );
};

export default FloatingButton;
