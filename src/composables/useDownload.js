import axios from 'axios';

export function useDownload(url, title = '', quality = '') {
  axios({
    method: 'get',
    url: url,
    responseType: 'blob',
  }).then((response) => {
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `${title}[${quality}].torrent`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}
