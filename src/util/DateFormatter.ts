export function formatChatTime(timestamp: string): string {
    const date = new Date(timestamp); //2025-09-29
    const now = new Date(); //2025-09-29

    const isToday = date.getDate() === now.getDate() && //29 ===29
        date.getMonth() === now.getMonth() && //09  ===09
        date.getFullYear() === now.getFullYear(); //2025 ===2025

    const yesterday = new Date(); //2025-09-29
    yesterday.setDate(now.getDate() - 1); //29-1 = 28 =>2025-09-28

    const isYesterday = date.getDate() === yesterday.getDate() && //28 ===28
        date.getMonth() === yesterday.getMonth() && //09  ===09
        date.getFullYear() === yesterday.getFullYear(); //2025 ===2025

    const timeStr = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }); //10:30 AM

    if (isToday) return timeStr;
    if (isYesterday) return `Yesterday ${timeStr}`;//Yesterday 10:30 AM
    return `${date.toLocaleTimeString} ${timeStr}`; //2025/09/26 10:30 AM
}