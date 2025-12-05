import CopyComp from "../CopyComp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';

export default function SideCopyBar() {
    return (
        <div className='side-copy-bar'>
            <h1><FontAwesomeIcon icon={faAnglesDown} /></h1>
            <div className='outside-frame-sidebar-wrapper'>
                <CopyComp />
            </div>
        </div>
    )
}