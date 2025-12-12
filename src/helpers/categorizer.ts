interface Categories {
    [key: string]: string;
}

const categories: Categories = {
    util: '🔧 Utility',
    moderation: '🛡️ Moderation',
};

export const categorizer = {
    categories,
    getCategoryName(folderName: string): string {
        return categories[folderName] || `📁 ${folderName}`;
    }
};
