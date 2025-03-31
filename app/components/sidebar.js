import { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { X, ArrowsOut, ArrowsIn } from 'phosphor-react';
import PropTypes from "prop-types";
import './styles/SidebarC.css'; 

const SidebarC = forwardRef((props, ref) => {
    const { open = false, fullScreen = false, children, className = '', onClose, title } = props;
    const [isFullScreen, setIsFullScreen] = useState(fullScreen);
    const bodyRef = useRef(null);

    const handleClose = () => {
        if (onClose) {
            onClose();
            
        }
    };

    const handleToggleFullScreen = () => {
        setIsFullScreen(prev => !prev);
    };

    useImperativeHandle(
        ref,
        () => ({
            top(hash) {
                if (!hash) {
                    bodyRef.current?.scrollTo(0, 0);
                    return;
                }
                const element = document.getElementById(hash);
                if (element) {
                    bodyRef.current?.scrollTo({
                        top: element.offsetTop
                    });
                }
            }
        }),
        []
    );

    const style = isFullScreen ? 'sidebarFullscreen' : 'sidebarNormal';
    const sidebarClassName = `${open ? 'sidebarOpen' : 'sidebarClosed'} ${isFullScreen ? 'sidebarFullscreen' : ''}`;

    return (
        <aside
            className={`sidebar ${sidebarClassName} ${className}`}
            aria-label='Sidebar'
        >
            <div className='sidebarHeader'>
                <h2 className='sidebarTitle'>{title}</h2>
                <div className='sidebarHeaderButtons'>
                    <button className='sidebarFullscreenButton' onClick={handleToggleFullScreen}>
                        {isFullScreen ? <ArrowsIn size={24} color="#333" /> : <ArrowsOut size={24} color="#333" />}
                    </button>
                    <button className='sidebarCloseButton' onClick={handleClose}>
                        <X size={24} color="#333" />
                    </button>
                </div>
            </div>
            <div
                className='sidebarContent'
                ref={bodyRef}
            >
                <div className={style}>{children}</div>
            </div>
        </aside>
    );
});

SidebarC.propTypes = {
    open: PropTypes.bool,
    fullScreen: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onClose: PropTypes.func,
    title: PropTypes.string,
};

SidebarC.displayName = 'SidebarC';

export default SidebarC;