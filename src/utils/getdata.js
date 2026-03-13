export default function findObjectById(data, id) {
    // console.log('Searching for ID:', id);

    // 递归函数，用于遍历数据结构
    function search(obj, path) {
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                // console.log('Current element:', obj[i]);
                // 更新路径
                let currentPath = path.concat(i);
                // 如果是对象，继续深入搜索
                if (typeof obj[i] === 'object' && obj[i] !== null) {
                    // console.log('Checking object:', obj[i]);
                    if (obj[i].id + obj[i].parentid === id) {
                        // 找到目标ID，返回路径
                        // console.log('Found ID:', id, 'at path:', currentPath);
                        return currentPath;
                    } else {
                        // 检查对象中的子数组属性
                        const subArrays = Object.keys(obj[i]).filter(key => Array.isArray(obj[i][key]));
                        for (const subArrayKey of subArrays) {
                            // console.log('Searching in sub-array:', subArrayKey);
                            let result = search(obj[i][subArrayKey], currentPath.concat(subArrayKey));
                            if (result) return result;
                        }
                    }
                }
            }
        } else if (typeof obj === 'object' && obj !== null) {
            // 检查对象中的子数组属性
            const subArrays = Object.keys(obj).filter(key => Array.isArray(obj[key]));
            for (const subArrayKey of subArrays) {
                // console.log('Searching in sub-array:', subArrayKey);
                let result = search(obj[subArrayKey], path.concat(subArrayKey));
                if (result) return result;
            }
        }
        // 如果当前对象或数组中没有找到，返回null
        // console.log('Not found in current object or array');
        return null;
    }
    // 从最外层对象开始搜索
    return search(data, []);
}

// // 示例数据结构
// const data = {
//     items: [
//         {
//             id: 1,
//             name: "Group 1",
//             subItems: [
//                 { id: 2, name: "Item 1-1" },
//                 {
//                     id: 3, name: "Item 1-2", subItems: [
//                         { id: 4, name: "SubItem 1-2-1" }
//                     ]
//                 }
//             ]
//         },
//         {
//             id: 5,
//             name: "Group 2",
//             subItems: [
//                 { id: 6, name: "Item 2-1" }
//             ]
//         }
//     ]
// };

// // 使用函数查找ID为4的对象
// const result = findObjectById(data, 4);
// console.log('Result:', result); // 输出位置路径，例如：['items', 0, 'subItems', 1, 'subItems', 0]