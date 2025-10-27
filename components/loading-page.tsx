import { Spinner } from "@/components/ui/spinner";

const LoadingPage = () => {
    return ( 
        <div className="flex flex-col gap-2 items-center justify-center w-full min-h-svh">
            <Spinner className="size-12" /> 
            <p className="text-xl text-center">
                Loading...
            </p>
        </div>
     );
}
 
export default LoadingPage;