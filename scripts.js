// 模板数据
const templates = {
    singleMovie: {
        name: "单场观影",
        fields: [
            { label: "电影名称", id: "movieName", type: "text" },
            { label: "电影版本", id: "movieVersion", type: "select", options: ["2D 原版", "IMAX 2D", "IMAX 3D", "杜比影院 2D", "杜比影院 3D", "2D OnyxLED", "自定义"] },
            { label: "自定义电影版本", id: "customMovieVersion", type: "text", conditional: { field: "movieVersion", value: "自定义" } },
            { label: "日期", id: "date", type: "date" },
            { label: "签到时间（提前）", id: "checkInTime", type: "select", options: ["30分钟", "1小时", "1.5小时"] },
            { label: "电影放映时间", id: "movieStartTime", type: "time" },
            { label: "是否支持代取票", id: "allowProxyTicket", type: "select", options: ["是", "否"] },
            { label: "电影时长", id: "movieDuration", type: "text" },
            { label: "活动物料", id: "eventMaterials", type: "textarea" },
            { label: "抽奖物料", id: "LotteryMaterials", type: "textarea" },
            { label: "地点", id: "location", type: "select", options: ["", "寰映影城（中洲湾C Future City店）", "金逸影城（宝安大仟里激光IMAX店）", "寰映影城（深圳湾睿印RAIL IN店）", "寰映影城（中航城君尚购物中心店）", "万象影城（深圳湾万象城店）", "万象影城（深圳万象城店）", "自定义"] },
            { label: "自定义地点", id: "customLocation", type: "text", conditional: { field: "location", value: "自定义" } },
            { label: "地铁信息", id: "subwayInfo", type: "text" },
            { label: "签到台位置", id: "checkInDesk", type: "text" }
        ],
        generate: function(data) {
            let checkInStart = "";
            if (data.checkInTime === "30分钟") {
                checkInStart = subtractMinutes(data.movieStartTime, 30);
            } else if (data.checkInTime === "1小时") {
                checkInStart = subtractMinutes(data.movieStartTime, 60);
            } else if (data.checkInTime === "1.5小时") {
                checkInStart = subtractMinutes(data.movieStartTime, 90);
            }
            const movieVersion = data.movieVersion === "自定义" ? data.customMovieVersion : data.movieVersion;
            const dateText = formatDate(data.date);
            const proxyTicketText = data.allowProxyTicket === "是" ? "🎫 代取含本人不超3张！" : "🎫 不支持代取票，与朋友同行请一并排队取票。";
            const LotteryText = data.LotteryMaterials.trim() ? `\n\n抽奖物料\n${data.LotteryMaterials}` : '';
            const locationText = data.location === "自定义" ? data.customLocation : data.location;
            return `《${data.movieName}》 ${movieVersion}\n📆 日期：${dateText}\n⏰ 签到：${checkInStart}-${data.movieStartTime}\n${proxyTicketText}\n📸 合影时间：${data.movieStartTime}\n🎬 放映时间：${data.movieStartTime}(延后不超过5分钟)\n⏳ 电影时长：${data.movieDuration}\n\n🧡活动物料🧡\n${data.eventMaterials}${LotteryText}\n\n海报因物流运输、包装等可能会出现瑕疵等。均随机发放，如需更换，请在电影结束后，有多余海报，方可更换，敬请理解。\n\n📍 地点：${locationText}\n🚇 地铁：${data.subwayInfo}\n👉 签到台在${data.checkInDesk}！\n\n💌 观影须知📵\n① 请不要踢椅背\n② 请将手机调至静音模式\n③ ❗️不要摄屏（摄屏指的是电影开始到字幕结束对着大银幕拍照录像）\n❌ 请勿乱加群友，有任何问题找群主！超3个人投诉乱加好友将踢出活动并黑名单处理！\n\n如果队伍里发现有插队行为可在群里提醒嘎嘎鸭，由工作人员核实调解。`;
        }
    },
    doubleMovie: {
        name: "两场连看",
        fields: [
            { label: "日期", id: "date", type: "date" },
            { label: "第一场电影名称", id: "firstMovieName", type: "text" },
            { label: "第一场电影版本", id: "firstMovieVersion", type: "select", options: ["2D 原版", "IMAX 2D", "IMAX 3D", "杜比影院 2D", "杜比影院 3D", "2D OnyxLED", "自定义"] },
            { label: "第一场自定义电影版本", id: "firstCustomMovieVersion", type: "text", conditional: { field: "firstMovieVersion", value: "自定义" } },
            { label: "是否支持代取票", id: "allowProxyTicket", type: "select", options: ["是", "否"] },
            { label: "是否支持连签", id: "allowContinuousSign", type: "select", options: ["是", "否"] },
            { label: "第一场签到时间（提前）", id: "firstCheckInTime", type: "select", options: ["30分钟", "1小时", "1.5小时"] },
            { label: "第一场电影放映时间", id: "firstMovieStartTime", type: "time" },
            { label: "第一场活动物料", id: "firstEventMaterials", type: "textarea" },
            { label: "第一场抽奖物料", id: "firstLotteryMaterials", type: "textarea" },
            { label: "第二场电影名称", id: "secondMovieName", type: "text" },
            { label: "第二场电影版本", id: "secondMovieVersion", type: "select", options: ["2D 原版", "IMAX 2D", "IMAX 3D", "杜比影院 2D", "杜比影院 3D", "2D OnyxLED", "自定义"] },
            { label: "第二场自定义电影版本", id: "secondCustomMovieVersion", type: "text", conditional: { field: "secondMovieVersion", value: "自定义" } },
            { label: "第二场签到时间（提前）", id: "secondCheckInTime", type: "select", options: ["30分钟", "1小时", "1.5小时"] },
            { label: "第二场电影放映时间", id: "secondMovieStartTime", type: "time" },
            { label: "第一场电影时长", id: "firstMovieDuration", type: "text" },
            { label: "第二场电影时长", id: "secondMovieDuration", type: "text" },
            { label: "第二场活动物料", id: "secondEventMaterials", type: "textarea" },
            { label: "第二场抽奖物料", id: "secondLotteryMaterials", type: "textarea" },
            { label: "地点", id: "location", type: "select", options: ["", "寰映影城（中洲湾C Future City店）", "金逸影城（宝安大仟里激光IMAX店）", "寰映影城（深圳湾睿印RAIL IN店）", "寰映影城（中航城君尚购物中心店）", "万象影城（深圳湾万象城店）", "万象影城（深圳万象城店）", "自定义"] },
            { label: "自定义地点", id: "customLocation", type: "text", conditional: { field: "location", value: "自定义" } },
            { label: "地铁信息", id: "subwayInfo", type: "text" },
            { label: "签到台位置", id: "checkInDesk", type: "text" }
        ],
        generate: function(data) {
            let firstCheckInStart = "";
            if (data.firstCheckInTime === "30分钟") {
                firstCheckInStart = subtractMinutes(data.firstMovieStartTime, 30);
            } else if (data.firstCheckInTime === "1小时") {
                firstCheckInStart = subtractMinutes(data.firstMovieStartTime, 60);
            } else if (data.firstCheckInTime === "1.5小时") {
                firstCheckInStart = subtractMinutes(data.firstMovieStartTime, 90);
            }
            let secondCheckInStart = "";
            if (data.secondCheckInTime === "30分钟") {
                secondCheckInStart = subtractMinutes(data.secondMovieStartTime, 30);
            } else if (data.secondCheckInTime === "1小时") {
                secondCheckInStart = subtractMinutes(data.secondMovieStartTime, 60);
            } else if (data.secondCheckInTime === "1.5小时") {
                secondCheckInStart = subtractMinutes(data.secondMovieStartTime, 90);
            }
            const firstMovieVersion = data.firstMovieVersion === "自定义" ? data.firstCustomMovieVersion : data.firstMovieVersion;
            const secondMovieVersion = data.secondMovieVersion === "自定义" ? data.secondCustomMovieVersion : data.secondMovieVersion;
            const dateText = formatDate(data.date);
            const proxyTicketText = data.allowProxyTicket === "是" ? "🎫 代取含本人不超3张！" : "🎫 不支持代取票，与朋友同行请一并排队取票。";
            const continuousSignText = data.allowContinuousSign === "是" ? "连看可连签 一票连签一张" : "";
            const locationText = data.location === "自定义" ? data.customLocation : data.location;
            const firstLotteryText = data.firstLotteryMaterials.trim() ? `\n\n抽奖物料\n${data.firstLotteryMaterials}` : '';
            const secondLotteryText = data.secondLotteryMaterials.trim() ? `\n\n抽奖物料\n${data.secondLotteryMaterials}` : '';
            return `📆 日期：${dateText}\n\n《${data.firstMovieName}》 ${firstMovieVersion}\n\n⏰ 签到时间：${firstCheckInStart}-${data.firstMovieStartTime}\n${proxyTicketText}\n${continuousSignText}\n📸 合影时间：${data.firstMovieStartTime}\n🎥 电影放映：${data.firstMovieStartTime}（延迟不超5分钟）\n⏳ 电影时长：${data.firstMovieDuration}\n\n\n🧡活动物料🧡\n${data.firstEventMaterials}${firstLotteryText}\n\n\n《${data.secondMovieName}》 ${secondMovieVersion}\n\n⏰ 签到时间：${secondCheckInStart}-${data.secondMovieStartTime}\n${proxyTicketText}\n📸 合影时间：${data.secondMovieStartTime}\n🎥 电影放映：${data.secondMovieStartTime}（延迟不超5分钟）\n⏳ 电影时长：${data.secondMovieDuration}\n\n🧡活动物料🧡\n${data.secondEventMaterials}${secondLotteryText}\n\n📍 地点：${locationText}\n🚇 地铁：${data.subwayInfo}\n👉 签到台在${data.checkInDesk}！\n\n💌 观影须知📵\n① 请不要踢椅背\n② 请将手机调至静音模式\n③ ❗不要摄屏（摄屏指的是电影开始到字幕结束对着大银幕拍照录像）\n\n请勿乱加群友，有何问题找群主！超3个人投诉乱加好友将踢出活动并加入黑名单处理！\n\n关于排队的温馨提示\n以下行为皆判定为插队：\n1.群内寻求代取票；\n2.为避免争议，如需要上厕所等暂时离队，请告知你前后排队的小伙伴；\n3.限定一人取票上限为3张，如需领取票数超过3张，需要相应人数同时排队（如4-6张需两人排队，7-9张需三人），不允许一人替多人排队卡位；如只有一人取票，请重新排队领取第四张。\n4.如果队伍里发现有插队行为可在群里提醒，由工作人员核实调解。`;
        }
    },
    tripleMovie: {
        name: "三场连看",
        fields: [
            { label: "第一场电影名称", id: "firstMovieName", type: "text" },
            { label: "第一场电影版本", id: "firstMovieVersion", type: "select", options: ["2D 原版", "IMAX 2D", "IMAX 3D", "杜比影院 2D", "杜比影院 3D", "2D OnyxLED", "自定义"] },
            { label: "第一场自定义电影版本", id: "firstCustomMovieVersion", type: "text", conditional: { field: "firstMovieVersion", value: "自定义" } },
            { label: "是否支持代取票", id: "allowProxyTicket", type: "select", options: ["是", "否"] },
            { label: "是否支持连签", id: "allowContinuousSign", type: "select", options: ["是", "否"] },
            { label: "第一场签到时间（提前）", id: "firstCheckInTime", type: "select", options: ["30分钟", "1小时", "1.5小时"] },
            { label: "第一场电影放映时间", id: "firstMovieStartTime", type: "time" },
            { label: "第一场电影时长", id: "firstMovieDuration", type: "text" },
            { label: "第一场活动物料", id: "firstEventMaterials", type: "textarea" },
            { label: "第一场抽奖物料", id: "firstLotteryMaterials", type: "textarea" },
            { label: "第二场电影名称", id: "secondMovieName", type: "text" },
            { label: "第二场电影版本", id: "secondMovieVersion", type: "select", options: ["2D 原版", "IMAX 2D", "IMAX 3D", "杜比影院 2D", "杜比影院 3D", "2D OnyxLED", "自定义"] },
            { label: "第二场自定义电影版本", id: "secondCustomMovieVersion", type: "text", conditional: { field: "secondMovieVersion", value: "自定义" } },
            { label: "第二场签到时间（提前）", id: "secondCheckInTime", type: "select", options: ["30分钟", "1小时", "1.5小时"] },
            { label: "第二场电影放映时间", id: "secondMovieStartTime", type: "time" },
            { label: "第二场电影时长", id: "secondMovieDuration", type: "text" },
            { label: "第二场活动物料", id: "secondEventMaterials", type: "textarea" },
            { label: "第二场抽奖物料", id: "secondLotteryMaterials", type: "textarea" },
            { label: "第三场电影名称", id: "thirdMovieName", type: "text" },
            { label: "第三场电影版本", id: "thirdMovieVersion", type: "select", options: ["2D 原版", "IMAX 2D", "IMAX 3D", "杜比影院 2D", "杜比影院 3D", "2D OnyxLED", "自定义"] },
            { label: "第三场自定义电影版本", id: "thirdCustomMovieVersion", type: "text", conditional: { field: "thirdMovieVersion", value: "自定义" } },
            { label: "日期", id: "date", type: "date" },
            { label: "第三场签到时间（提前）", id: "thirdCheckInTime", type: "select", options: ["30分钟", "1小时", "1.5小时"] },
            { label: "第三场电影放映时间", id: "thirdMovieStartTime", type: "time" },
            { label: "第三场电影时长", id: "thirdMovieDuration", type: "text" },
            { label: "第三场活动物料", id: "thirdEventMaterials", type: "textarea" },
            { label: "第三场抽奖物料", id: "thirdLotteryMaterials", type: "textarea" },
            { label: "地点", id: "location", type: "select", options: ["", "寰映影城（中洲湾C Future City店）", "金逸影城（宝安大仟里激光IMAX店）", "寰映影城（深圳湾睿印RAIL IN店）", "寰映影城（中航城君尚购物中心店）", "万象影城（深圳湾万象城店）", "万象影城（深圳万象城店）", "自定义"] },
            { label: "自定义地点", id: "customLocation", type: "text", conditional: { field: "location", value: "自定义" } },
            { label: "地铁信息", id: "subwayInfo", type: "text" },
            { label: "签到台位置", id: "checkInDesk", type: "text" }
        ],
        generate: function(data) {
            let firstCheckInStart = "";
            if (data.firstCheckInTime === "30分钟") {
                firstCheckInStart = subtractMinutes(data.firstMovieStartTime, 30);
            } else if (data.firstCheckInTime === "1小时") {
                firstCheckInStart = subtractMinutes(data.firstMovieStartTime, 60);
            } else if (data.firstCheckInTime === "1.5小时") {
                firstCheckInStart = subtractMinutes(data.firstMovieStartTime, 90);
            }
            let secondCheckInStart = "";
            if (data.secondCheckInTime === "30分钟") {
                secondCheckInStart = subtractMinutes(data.secondMovieStartTime, 30);
            } else if (data.secondCheckInTime === "1小时") {
                secondCheckInStart = subtractMinutes(data.secondMovieStartTime, 60);
            } else if (data.secondCheckInTime === "1.5小时") {
                secondCheckInStart = subtractMinutes(data.secondMovieStartTime, 90);
            }
            let thirdCheckInStart = "";
            if (data.thirdCheckInTime === "30分钟") {
                thirdCheckInStart = subtractMinutes(data.thirdMovieStartTime, 30);
            } else if (data.thirdCheckInTime === "1小时") {
                thirdCheckInStart = subtractMinutes(data.thirdMovieStartTime, 60);
            } else if (data.thirdCheckInTime === "1.5小时") {
                thirdCheckInStart = subtractMinutes(data.thirdMovieStartTime, 90);
            }
            const firstMovieVersion = data.firstMovieVersion === "自定义" ? data.firstCustomMovieVersion : data.firstMovieVersion;
            const secondMovieVersion = data.secondMovieVersion === "自定义" ? data.secondCustomMovieVersion : data.secondMovieVersion;
            const thirdMovieVersion = data.thirdMovieVersion === "自定义" ? data.thirdCustomMovieVersion : data.thirdMovieVersion;
            const dateText = formatDate(data.date);
            const proxyTicketText = data.allowProxyTicket === "是" ? "🎫 代取含本人不超3张！" : "🎫 不支持代取票，与朋友同行请一并排队取票。";
            const continuousSignText = data.allowContinuousSign === "是" ? "连看可连签 一票连签一张" : "";
            const locationText = data.location === "自定义" ? data.customLocation : data.location;
            const firstLotteryText = data.firstLotteryMaterials.trim() ? `\n\n抽奖物料\n${data.firstLotteryMaterials}` : '';
            const secondLotteryText = data.secondLotteryMaterials.trim() ? `\n\n抽奖物料\n${data.secondLotteryMaterials}` : '';
            const thirdLotteryText = data.thirdLotteryMaterials.trim() ? `\n\n抽奖物料\n${data.thirdLotteryMaterials}` : '';
            return `📆 日期：${dateText}\n\n《${data.firstMovieName}》 ${firstMovieVersion}\n\n⏰ 签到时间：${firstCheckInStart}-${data.firstMovieStartTime}\n${proxyTicketText}\n${continuousSignText}\n📸 合影时间：${data.firstMovieStartTime}\n🎥 电影放映：${data.firstMovieStartTime}（延迟不超5分钟）\n⏳ 电影时长：${data.firstMovieDuration}\n\n\n🧡活动物料🧡\n${data.firstEventMaterials}${firstLotteryText}\n\n\n《${data.secondMovieName}》 ${secondMovieVersion}\n\n⏰ 签到时间：${secondCheckInStart}-${data.secondMovieStartTime}\n${proxyTicketText}\n📸 合影时间：${data.secondMovieStartTime}\n🎥 电影放映：${data.secondMovieStartTime}（延迟不超5分钟）\n⏳ 电影时长：${data.secondMovieDuration}\n\n🧡活动物料🧡\n${data.secondEventMaterials}${secondLotteryText}\n\n\n《${data.thirdMovieName}》 ${thirdMovieVersion}\n\n⏰ 签到时间：${thirdCheckInStart}-${data.thirdMovieStartTime}\n${proxyTicketText}\n📸 合影时间：${data.thirdMovieStartTime}\n🎥 电影放映：${data.thirdMovieStartTime}（延迟不超5分钟）\n⏳ 电影时长：${data.thirdMovieDuration}\n\n🧡活动物料🧡\n${data.thirdEventMaterials}${thirdLotteryText}\n\n📍 地点：${locationText}\n🚇 地铁：${data.subwayInfo}\n👉 签到台在${data.checkInDesk}！\n\n💌 观影须知📵\n① 请不要踢椅背\n② 请将手机调至静音模式\n③ ❗不要摄屏（摄屏指的是电影开始到字幕结束对着大银幕拍照录像）\n\n请勿乱加群友，有何问题找群主！超3个人投诉乱加好友将踢出活动并加入黑名单处理！\n\n关于排队的温馨提示\n以下行为皆判定为插队：\n1.群内寻求代取票；\n2.为避免争议，如需要上厕所等暂时离队，请告知你前后排队的小伙伴；\n3.限定一人取票上限为3张，如需领取票数超过3张，需要相应人数同时排队（如4-6张需两人排队，7-9张需三人），不允许一人替多人排队卡位；如只有一人取票，请重新排队领取第四张。\n4.如果队伍里发现有插队行为可在群里提醒，由工作人员核实调解。`;
        }
    }
};

// 计算签到开始时间
function subtractMinutes(time, minutes) {
    let [hours, mins] = time.split(':').map(Number);
    mins -= minutes;
    if (mins < 0) {
        hours -= Math.ceil(Math.abs(mins) / 60);
        mins = 60 - Math.abs(mins) % 60;
        if (mins === 60) {
            mins = 0;
            hours += 1;
        }
    }
    if (hours < 0) hours += 24;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// 格式化日期为“X月X日”
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
}

// 地点与地铁信息、签到台位置的对应关系
const locationData = {
    "寰映影城（中洲湾C Future City店）": { subway: "9号线下沙站B出口", checkInDesk: "影城3楼" },
    "金逸影城（宝安大仟里激光IMAX店）": { subway: "1号线坪洲站A出口", checkInDesk: "影城4楼" },
    "寰映影城（深圳湾睿印RAIL IN店）": { subway: "9/11号线红树湾南E出口", checkInDesk: "影城4楼" },
    "寰映影城（中航城君尚购物中心店）": { subway: "1号线华强路站B出口", checkInDesk: "影城4楼" },
    "万象影城（深圳湾万象城店）": { subway: "11/13号线后海站G出口", checkInDesk: "影城4楼" },
    "万象影城（深圳万象城店）": { subway: "1/2/8号线大剧院站F出口", checkInDesk: "影城3楼" },
    "自定义": { subway: "", checkInDesk: "" }
};

// 动态生成模板字段
function generateTemplateFields(templateId) {
    const template = templates[templateId];
    const fieldsContainer = document.getElementById('templateFields');
    fieldsContainer.innerHTML = '';
    
    template.fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'mb-2';
        let inputElement = '';
        if (field.type === 'textarea') {
            inputElement = `<textarea id="${field.id}" class="w-full p-2 border rounded" rows="3"></textarea>`;
        } else if (field.type === 'select') {
            inputElement = `<select id="${field.id}" class="w-full p-2 border rounded">`;
            field.options.forEach(option => {
                if (option === "") {
                    inputElement += `<option value="${option}" selected>${option || "请选择"}</option>`;
                } else {
                    inputElement += `<option value="${option}">${option}</option>`;
                }
            });
            inputElement += `</select>`;
        } else if (field.type === 'date') {
            inputElement = `<input id="${field.id}" type="date" class="w-full p-2 border rounded">`;
        } else if (field.type === 'time') {
            inputElement = `<input id="${field.id}" type="time" class="w-full p-2 border rounded">`;
        } else {
            inputElement = `<input id="${field.id}" type="text" class="w-full p-2 border rounded">`;
        }
        div.innerHTML = `
            <label for="${field.id}" class="block mb-1">${field.label}</label>
            ${inputElement}
        `;
        fieldsContainer.appendChild(div);
        
        // 处理条件字段
        if (field.conditional) {
            const selectElement = document.getElementById(field.conditional.field);
            if (selectElement) {
                selectElement.addEventListener('change', function() {
                    const conditionalDiv = document.getElementById(field.id).parentElement;
                    if (this.value === field.conditional.value) {
                        conditionalDiv.style.display = 'block';
                    } else {
                        conditionalDiv.style.display = 'none';
                    }
                });
                // 初始化时隐藏条件字段
                if (selectElement.value !== field.conditional.value) {
                    div.style.display = 'none';
                }
            }
        }
        
        // 处理地点自动填充
        if (field.id === 'location') {
            const locationSelect = document.getElementById('location');
            locationSelect.addEventListener('change', function() {
                const data = locationData[this.value];
                if (data) {
                    document.getElementById('subwayInfo').value = data.subway;
                    document.getElementById('checkInDesk').value = data.checkInDesk;
                }
            });
        }
        
        // 实时保存输入框内容
        const inputField = document.getElementById(field.id);
        inputField.addEventListener('input', function() {
            saveData(templateId);
        });
        inputField.addEventListener('change', function() {
            saveData(templateId);
        });
    });
    loadSavedData(templateId);
}

// 生成公告
function generateAnnouncement() {
    const templateId = document.getElementById('templateSelect').value;
    const template = templates[templateId];
    const data = {};
    
    template.fields.forEach(field => {
        data[field.id] = document.getElementById(field.id).value;
    });
    
    const announcementText = template.generate(data);
    const output = document.getElementById('announcementOutput');
    output.value = announcementText;
    output.readOnly = false; // 使生成的公告文本可编辑
    saveData(templateId);
}

// 编辑公告
function editAnnouncement() {
    const output = document.getElementById('announcementOutput');
    output.readOnly = false;
    output.focus();
}

// 复制到剪贴板
function copyToClipboard() {
    const output = document.getElementById('announcementOutput');
    output.select();
    document.execCommand('copy');
    alert('公告已复制到剪贴板');
}

// 一键清空
function clearAll() {
    const templateId = document.getElementById('templateSelect').value;
    const template = templates[templateId];
    template.fields.forEach(field => {
        document.getElementById(field.id).value = '';
    });
    document.getElementById('announcementOutput').value = '';
    localStorage.removeItem(`savedData_${templateId}`);
}

// 保存数据到本地存储
function saveData(templateId) {
    const template = templates[templateId];
    const data = {};
    template.fields.forEach(field => {
        data[field.id] = document.getElementById(field.id).value;
    });
    data['announcementOutput'] = document.getElementById('announcementOutput').value;
    localStorage.setItem(`savedData_${templateId}`, JSON.stringify(data));
}

// 加载保存的数据
function loadSavedData(templateId) {
    const savedData = localStorage.getItem(`savedData_${templateId}`);
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = data[key];
            }
        });
        // 触发条件字段的显示/隐藏
        templates[templateId].fields.forEach(field => {
            if (field.conditional) {
                const selectElement = document.getElementById(field.conditional.field);
                if (selectElement) {
                    const conditionalDiv = document.getElementById(field.id).parentElement;
                    if (selectElement.value === field.conditional.value) {
                        conditionalDiv.style.display = 'block';
                    } else {
                        conditionalDiv.style.display = 'none';
                    }
                }
            }
        });
    }
}

// 事件监听
document.getElementById('templateSelect').addEventListener('change', function() {
    generateTemplateFields(this.value);
});
document.getElementById('generateBtn').addEventListener('click', generateAnnouncement);
document.getElementById('editBtn').addEventListener('click', editAnnouncement);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
document.getElementById('clearBtn').addEventListener('click', clearAll);

// 初始化
generateTemplateFields('singleMovie');