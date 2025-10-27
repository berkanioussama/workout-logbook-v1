import Link from "next/link"
import { Settings } from "lucide-react"

const TopBar = () => {
    return (
        <div className="flex items-center justify-center w-full bg-neutral-800 py-4">
            <div className="container px-4 flex items-center justify-between">
                <div>
                    <h3>Profile</h3>
                </div>
                <div>
                    <Link href="/profile/edit" className='cursor-pointer'><Settings /></Link>
                </div>
            </div>
        </div> 
    )
}

export default TopBar
