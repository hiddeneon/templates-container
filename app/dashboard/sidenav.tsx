import CreateFormToggle from "../ui/create-form-toggle";
import DecorBtn from "../ui/buttons/decoration"
import { UserButton } from "@clerk/nextjs";
import { Tooltip } from "radix-ui";

export default function SideNav() {
    
    return (
        <nav className='side-nav-bar'>
            <div className='nav-btns'>                		
        <CreateFormToggle />

        <Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<DecorBtn />
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent" sideOffset={5} side="right">
						Оформление
						<Tooltip.Arrow className="TooltipArrow" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
            </div>
            
                <Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<span className='user-btn-wrapper'><UserButton /></span>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent" sideOffset={5} side="right">
						Мой аккаунт
						<Tooltip.Arrow className="TooltipArrow" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
                
        </nav>
    )
}