/**
 * 游泳报名数据收集 - Google Apps Script
 * 
 * 使用方法：
 * 1. 打开 Google 表格，新建空白表格
 * 2. 从 URL 中获取表格 ID（/d/THIS_IS_THE_ID/edit）
 * 3. 修改下方 SHEET_ID 为你的表格 ID
 * 4. 点击"扩展程序"→"Apps Script"，粘贴此代码
 * 5. 部署 → 新建部署 → 类型选"网页应用"
 *    - 执行身份：任何人
 *    - 有权访问：任何人
 * 6. 复制生成的网址，填入管理后台的"数据收集设置"
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // ← 改为你的表格 ID
const SHEET_NAME = '报名数据';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // 如果表格不存在则创建并添加表头
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
      newSheet.appendRow([
        '提交时间', '学员姓名', '性别', '年龄', '身高(cm)', '体重(kg)',
        '身份证号', '家长联系人', '联系电话', '紧急联系人及电话',
        '有无疾病', '疾病注明', '游泳基础', '泳姿',
        '选择课程', '意向上课时段', '上课场地',
        '报名类型', '组团人数', '转介绍优惠',
        '抵扣代金券(元)', '课程原价(元)', '优惠抵扣(元)', '实缴金额(元)',
        '缴费方式', '缴费日期', '学员/家长签字', '填表日期'
      ]);
    }

    // 写入数据行
    const row = [
      data.submitted_at || '',
      data.name || '', data.gender || '', data.age || '', data.height || '', data.weight || '',
      data.id_number || '', data.parent_contact || '', data.phone || '', data.emergency_contact || '',
      data.disease || '', data.disease_note || '',
      data.swim_level || '', data.swim_style || '',
      Array.isArray(data.courses) ? data.courses.join('、') : (data.courses || ''),
      Array.isArray(data.time_slots) ? data.time_slots.join('、') : (data.time_slots || ''),
      data.venue || '',
      data.reg_type || '', data.group_size || '', data.referral || '',
      data.voucher || '', data.original_price || '', data.discount || '', data.final_price || '',
      data.payment_method || '', data.payment_date || '',
      data.signature || '', data.fill_date || ''
    ];

    const targetSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    targetSheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: '游泳报名表数据收集服务运行中' }))
    .setMimeType(ContentService.MimeType.JSON);
}
