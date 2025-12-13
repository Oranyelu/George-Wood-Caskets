export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#135B3A]"></div>
        </div>
    );
}
