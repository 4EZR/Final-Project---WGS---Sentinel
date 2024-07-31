import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from 'react-router-dom'; 
export function SidebarButton({ icon, tooltipText,href, ...props }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link to={href}>
                        <Button variant="ghost" {...props} size='icon'>
                            {icon}
                            {props.children}
                        </Button>
                    </Link>
                </TooltipTrigger>

                <TooltipContent side="right">
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
