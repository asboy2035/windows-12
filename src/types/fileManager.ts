export interface IFile {
  id: string
  name: string
  extension: string
  date: number // Timestamp
  type: 'file'
  imagePath?: string // Optional image path
}

export interface IFolder {
  id: string
  name: string
  type: 'folder'
  children: (IFile | IFolder)[]
  imagePath?: string // Optional image path
}
