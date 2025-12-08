import CopyComp from "../CopyComp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

export default function SideCopyBar() {
    return (
        <div className='side-copy-bar'>
            <span><FontAwesomeIcon icon={faSquarePlus} /><p>Добавить символы</p></span>
            <div className='outside-frame-sidebar-wrapper'>
                <CopyComp />
            </div>
        </div>
    )
}