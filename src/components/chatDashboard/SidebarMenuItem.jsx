const SidebarMenuItem = ({ Icon, label, isExpanded }) => {
	return (
		<div
			className={`flex h-11 cursor-pointer items-center justify-start gap-2 rounded-full px-[0.875rem] text-sm text-gray-600 duration-500 hover:bg-brand-200 ${
				isExpanded ? 'w-full' : 'w-11'
			}`}
		>
			<Icon className='min-w-4' size={16} />
			<p className='line-clamp-1'>{label}</p>
		</div>
	);
};

export default SidebarMenuItem;
