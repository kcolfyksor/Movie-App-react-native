/**
*Name: Lew Wen Khai
*Reg. No.: 1303023
*/

exports.getValue = (array, key) => {
	return array.filter((o) => o.key === key)[0].value
}

exports.language = [
	{key: '01', value: 'English'},
	{key: '02', value: 'Malay'},
	{key: '03', value: 'Mandarin'},
	{key: '04', value: 'Cantonese'},
	{key: '05', value: 'Japanese'},
	{key: '06', value: 'Korean'},
];