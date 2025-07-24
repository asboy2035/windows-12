  import { defineStore } from 'pinia'
  import { ref } from 'vue'
  import type { IFile, IFolder } from '@/types/fileManager'
  import type { App } from '@/stores/apps'

  export const useFileManagerStore = defineStore('fileManager', () => {
    const fileSystem = ref<IFolder>({
      id: 'root',
      name: 'Root',
      type: 'folder',
      children: [],
    })

    function initializeFileManager(apps: App[]) {
      const appsFolderChildren: (IFile | IFolder)[] = apps.map(app => ({
        id: app.id,
        name: app.name,
        extension: 'exe',
        date: Date.now(),
        type: 'file',
        imagePath: app.icon,
      }))

      fileSystem.value = {
        id: 'root',
        name: 'Root',
        type: 'folder',
        children: [
          {
            id: 'home',
            name: 'Home',
            type: 'folder',
            children: [
              { id: 'doc1', name: 'Document1', extension: 'txt', date: Date.now(), type: 'file' },
              { id: 'pic1', name: 'Image1', extension: 'png', date: Date.now(), type: 'file' },
            ],
          },
          {
            id: 'documents',
            name: 'Documents',
            type: 'folder',
            children: [
              { id: 'doc2', name: 'Report', extension: 'docx', date: Date.now(), type: 'file' },
            ],
          },
          {
            id: 'desktop',
            name: 'Desktop',
            type: 'folder',
            children: [],
          },
          {
            id: 'apps',
            name: 'Apps',
            type: 'folder',
            children: appsFolderChildren,
          },
          {
            id: 'system',
            name: 'System',
            type: 'folder',
            children: [],
          },
          {
            id: 'music',
            name: 'Music',
            type: 'folder',
            children: [],
          },
          {
            id: 'movies',
            name: 'Movies',
            type: 'folder',
            children: [],
          },
          {
            id: 'pictures',
            name: 'Pictures',
            type: 'folder',
            children: [],
          },
          {
            id: 'local-disk-c',
            name: 'Local Disk (C:)',
            type: 'folder',
            children: [],
          },
        ],
      }
    }

    function getFolderContent(path: string): (IFile | IFolder)[] {
      const pathSegments = path.split('/').filter(segment => segment !== '')
      let currentFolder: IFolder | undefined = fileSystem.value

      if (pathSegments.length === 0) {
        return fileSystem.value.children
      }

      for (const segment of pathSegments) {
        if (!currentFolder) break
        const nextFolder = currentFolder.children.find(
          item => item.type === 'folder' && item.name === segment
        ) as IFolder | undefined
        currentFolder = nextFolder
      }

      return currentFolder ? currentFolder.children : []
    }

    return {
      fileSystem,
      initializeFileManager,
      getFolderContent,
    }
  })
