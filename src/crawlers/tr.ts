import xlsx from 'xlsx';

class TrCrawler {
  all() {
    const sheet = xlsx.readFile('/home/ronald/Downloads/gerador_indices_tr.xls');
    console.log(sheet);
  }
}

export default new TrCrawler();
