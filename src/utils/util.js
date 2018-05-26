export const toast = (content, icon, duration) => {
    wx.showToast({
        title: content,
        duration: duration || 2000,
        icon: icon || 'none',
        mask: true
    });
};