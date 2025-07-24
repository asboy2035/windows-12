import type { IFile, IFolder } from '@/types/fileManager'

export function getFileIconPath(item: IFile | IFolder): string {
  if (item.type === 'folder') {
    return '/icons/fileTypes/folder.png'
  } else if (item.type === 'file') {
    if (item.imagePath) {
      return item.imagePath
    }

    switch (item.extension.toLowerCase()) {
      case 'zip':
        return '/icons/fileTypes/zip.png'
      case 'exe': // fallback exe
        return '/icons/fileTypes/exe.png'
      case 'txt':
        return '/icons/fileTypes/txt.png'

      case 'png':
        return '/icons/fileTypes/png.png'
      case 'jpg': case 'jpeg':
        return '/icons/fileTypes/jpg.png'
      case 'gif':
        return '/icons/fileTypes/gif.png'

      case 'docx': case 'doc':
        return '/icons/fileTypes/docx.png'
      case 'ppt':
        return '/icons/fileTypes/ppt.png'
      case 'pdf':
        return '/icons/fileTypes/pdf.png'

      case 'mp4':
        return '/icons/fileTypes/mp4.png'
      case 'mp3': case 'wav':
        return '/icons/fileTypes/music.png'

      default:
        return '/icons/fileTypes/file.png' // Generic file icon
    }
  }
  return '/icons/fileTypes/file.png' // Fallback
}
