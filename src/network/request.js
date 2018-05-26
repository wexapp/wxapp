import regenrator from '../libs/regenrator';

const domain = 'http://localhost:3000';

const getOptions = (method, params, header) => {
    const options = {
        method: 'GET',
        header: { 'content-type': 'application/json' }
    };

    if(method) {
        options.method = method;
    }

    if(params) {
        options.data = params;
    }

    if(header) {
        options.header = Object.assign({}, options.header, header);
    }

    return options;
}

export const regeneratorRuntime = regenrator;

export default async ({ url, method, params, header }) => {
    return await new Promise((resolve, reject) => {
        wx.request({
            url: domain + url,
            ...getOptions(method, params, header),
            success: (res) => {
                resolve({
                    data: res.data,
                    respCode: 1000
                });
            },
            fail: (err) => {
                resolve({
                    respMsg: '网路错误',
                    respCode: '-1000'
                });
            }
        });
    });
};