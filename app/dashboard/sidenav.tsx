import CreateFormToggle from "../ui/create-form-toggle";
import DecorBtn from "../ui/buttons/decoration"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare as faPenToSquareSolid } from '@fortawesome/free-solid-svg-icons';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function SideNav() {
    return (
        <nav className='side-nav-bar'>
            <div className='nav-btns'>
                <CreateFormToggle />
                <DecorBtn />
            </div>
            <span className='user-btn-wrapper'><UserButton /></span>
        </nav>
    )
}