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

  // Function to generate a random timestamp within the last 5 years
  const getRandomDate = () => {
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    const startDate = fiveYearsAgo.getTime();
    const endDate = Date.now();
    return Math.floor(Math.random() * (endDate - startDate) + startDate);
  };

  function initializeFileManager(apps: App[]) {
    const appsFolderChildren: (IFile | IFolder)[] = apps.map(app => ({
      id: app.id,
      name: app.name,
      extension: 'exe',
      date: getRandomDate(),
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
            { id: 'welcome', name: 'Welcome', extension: 'txt', date: getRandomDate(), type: 'file' },
            { id: 'important-links', name: 'Important Links', extension: 'txt', date: getRandomDate(), type: 'file' },
          ],
        },
        {
          id: 'desktop',
          name: 'Desktop',
          type: 'folder',
          children: [
            { id: 'shortcut', name: 'MyApp', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'note', name: 'Todo', extension: 'txt', date: getRandomDate(), type: 'file' },
            { id: 'screenshot', name: 'Screenshot_2023-01-15', extension: 'png', date: getRandomDate(), type: 'file' },
            { id: 'game-shortcut', name: 'MyFavoriteGame', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'read-me', name: 'ReadMe', extension: 'txt', date: getRandomDate(), type: 'file' },
            { id: 'dev-tools', name: 'DevelopmentTools', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'presentation-draft', name: 'Q3_Presentation_Draft', extension: 'ppt', date: getRandomDate(), type: 'file' },
            { id: 'work-doc', name: 'ClientBrief_V2', extension: 'docx', date: getRandomDate(), type: 'file' },
            { id: 'invoice-shortcut', name: 'GenerateInvoice', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'meeting-agenda', name: 'DailyStandup_Agenda', extension: 'txt', date: getRandomDate(), type: 'file' },
            { id: 'project-notes', name: 'ProjectX_Notes', extension: 'txt', date: getRandomDate(), type: 'file' },
            { id: 'new-folder', name: 'New Folder', type: 'folder', children: [] },
            { id: 'temp-report', name: 'TemporaryReport', extension: 'pdf', date: getRandomDate(), type: 'file' },
          ],
        },
        {
          id: 'documents',
          name: 'Documents',
          type: 'folder',
          children: [
            {
              id: 'work',
              name: 'Work',
              type: 'folder',
              children: [
                { id: 'resume', name: 'Resume_JohnDoe', extension: 'docx', date: getRandomDate(), type: 'file' },
                { id: 'invoice', name: 'Invoice-Q2-2024', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'project-plan', name: 'ProjectX_Plan', extension: 'ppt', date: getRandomDate(), type: 'file' },
                { id: 'meeting-notes', name: 'TeamMeeting_07-2024', extension: 'txt', date: getRandomDate(), type: 'file' },
                { id: 'report', name: 'AnnualReport_2023', extension: 'docx', date: getRandomDate(), type: 'file' },
                { id: 'contract', name: 'ClientContract_Final', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'budget', name: 'DepartmentBudget_FY24', extension: 'docx', date: getRandomDate(), type: 'file' },
                { id: 'marketing-strategy', name: 'MarketingStrategy_2024', extension: 'pptx', date: getRandomDate(), type: 'file' },
                { id: 'sales-figures', name: 'SalesFigures_Q1', extension: 'docx', date: getRandomDate(), type: 'file' },
                {
                  id: 'presentations',
                  name: 'Presentations',
                  type: 'folder',
                  children: [
                    { id: 'sales-pitch', name: 'SalesPitch_Q3', extension: 'ppt', date: getRandomDate(), type: 'file' },
                    { id: 'training-module', name: 'NewEmployeeTraining', extension: 'ppt', date: getRandomDate(), type: 'file' },
                    { id: 'investor-deck', name: 'InvestorDeck_August', extension: 'pdf', date: getRandomDate(), type: 'file' },
                  ],
                },
                {
                  id: 'proposals',
                  name: 'Proposals',
                  type: 'folder',
                  children: [
                    { id: 'proposal-alpha', name: 'ProjectAlpha_Proposal', extension: 'pdf', date: getRandomDate(), type: 'file' },
                    { id: 'proposal-beta', name: 'ProjectBeta_Bid', extension: 'docx', date: getRandomDate(), type: 'file' },
                  ],
                },
              ],
            },
            {
              id: 'personal',
              name: 'Personal',
              type: 'folder',
              children: [
                { id: 'diary', name: 'MyJournal_2024', extension: 'txt', date: getRandomDate(), type: 'file' },
                { id: 'passport', name: 'PassportScan_John', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'recipes', name: 'FamilyRecipes', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'budget-home', name: 'MonthlyBudget_Home', extension: 'docx', date: getRandomDate(), type: 'file' },
                { id: 'letters', name: 'OldLetters', extension: 'doc', date: getRandomDate(), type: 'file' },
                { id: 'health-records', name: 'MedicalHistory', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'travel-plans', name: 'EuropeTrip_Itinerary', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'insurance', name: 'InsurancePolicies', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'car-documents', name: 'CarTitle', extension: 'pdf', date: getRandomDate(), type: 'file' },
              ],
            },
            {
              id: 'school',
              name: 'School',
              type: 'folder',
              children: [
                { id: 'thesis', name: 'MastersThesis', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'assignment1', name: 'HistoryEssay', extension: 'docx', date: getRandomDate(), type: 'file' },
                { id: 'presentation', name: 'ScienceProject', extension: 'ppt', date: getRandomDate(), type: 'file' },
                { id: 'notes-math', name: 'CalculusNotes', extension: 'txt', date: getRandomDate(), type: 'file' },
                { id: 'research-paper', name: 'QuantumPhysics_Paper', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'group-project', name: 'GroupProject_Final', extension: 'pptx', date: getRandomDate(), type: 'file' },
                { id: 'lecture-slides', name: 'Lecture1_Intro', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'exam-review', name: 'MidtermReview', extension: 'docx', date: getRandomDate(), type: 'file' },
              ],
            },
            {
              id: 'finance',
              name: 'Finance',
              type: 'folder',
              children: [
                { id: 'bank-statements', name: 'BankStatement_Jul', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'tax-documents', name: 'TaxReturns_2023', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'investment-portfolio', name: 'Investments', extension: 'docx', date: getRandomDate(), type: 'file' },
                { id: 'credit-card', name: 'CreditCardStatement_Jun', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'receipts', name: 'Receipts_Q2', extension: 'pdf', date: getRandomDate(), type: 'file' },
              ],
            },
          ],
        },
        {
          id: 'downloads',
          name: 'Downloads',
          type: 'folder',
          children: [
            { id: 'chrome-installer', name: 'ChromeSetup', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'ebook', name: 'LearnVue_Book', extension: 'pdf', date: getRandomDate(), type: 'file' },
            { id: 'archive', name: 'PhotosBackup_2023', extension: 'zip', date: getRandomDate(), type: 'file' },
            { id: 'driver-update', name: 'GraphicsDriver_v2.0', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'setup-file', name: 'SoftwareInstaller', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'music-download', name: 'NewSong_Artist', extension: 'mp3', date: getRandomDate(), type: 'file' },
            { id: 'video-clip', name: 'FunnyClip', extension: 'mp4', date: getRandomDate(), type: 'file' },
            { id: 'document-download', name: 'PublicReport', extension: 'pdf', date: getRandomDate(), type: 'file' },
            { id: 'image-download', name: 'CoolWallpaper', extension: 'jpg', date: getRandomDate(), type: 'file' },
            { id: 'audio-sample', name: 'DrumLoop_Sample', extension: 'wav', date: getRandomDate(), type: 'file' },
            { id: 'zip-archive', name: 'ProjectFiles_Archive', extension: 'zip', date: getRandomDate(), type: 'file' },
            { id: 'software-patch', name: 'GamePatch_v1.1', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'font-pack', name: 'NewFonts', extension: 'zip', date: getRandomDate(), type: 'file' },
            { id: 'installer-log', name: 'InstallLog', extension: 'txt', date: getRandomDate(), type: 'file' },
            { id: 'temp-data', name: 'TempData_Download', extension: 'tmp', date: getRandomDate(), type: 'file' },
            { id: 'ebook-fantasy', name: 'FantasyNovel_Part1', extension: 'pdf', date: getRandomDate(), type: 'file' },
            { id: 'software-manual', name: 'SoftwareManual', extension: 'pdf', date: getRandomDate(), type: 'file' },
          ],
        },
        {
          id: 'music',
          name: 'Music',
          type: 'folder',
          children: [
            { id: 'song1', name: 'ChillVibes', extension: 'mp3', date: getRandomDate(), type: 'file' },
            { id: 'song2', name: 'LoFiStudy', extension: 'mp3', date: getRandomDate(), type: 'file' },
            { id: 'album1', name: 'GreatestHits_ArtistA', extension: 'mp3', date: getRandomDate(), type: 'file' },
            { id: 'playlist1', name: 'WorkoutMix', extension: 'wav', date: getRandomDate(), type: 'file' },
            { id: 'recordings', name: 'MyVoiceMemos', extension: 'mp3', date: getRandomDate(), type: 'file' },
            { id: 'concert-rec', name: 'LiveConcert_2023', extension: 'mp3', date: getRandomDate(), type: 'file' },
            { id: 'sound-effects', name: 'GameSoundEffects', extension: 'wav', date: getRandomDate(), type: 'file' },
            { id: 'podcast', name: 'DailyNews_Podcast', extension: 'mp3', date: getRandomDate(), type: 'file' },
            { id: 'classical', name: 'ClassicalPiano_Sonata', extension: 'mp3', date: getRandomDate(), type: 'file' },
            {
              id: 'playlists',
              name: 'Playlists',
              type: 'folder',
              children: [
                { id: 'roadtrip', name: 'RoadtripAnthems', extension: 'mp3', date: getRandomDate(), type: 'file' },
                { id: 'sleep-aid', name: 'RelaxingSounds', extension: 'wav', date: getRandomDate(), type: 'file' },
                { id: 'focus-music', name: 'ConcentrationMix', extension: 'mp3', date: getRandomDate(), type: 'file' },
              ],
            },
            {
              id: 'albums',
              name: 'Albums',
              type: 'folder',
              children: [
                { id: 'album-b', name: 'BestOfArtistB', extension: 'mp3', date: getRandomDate(), type: 'file' },
                { id: 'album-c', name: 'IndieDiscoveries', extension: 'mp3', date: getRandomDate(), type: 'file' },
              ],
            },
          ],
        },
        {
          id: 'movies',
          name: 'Movies',
          type: 'folder',
          children: [
            { id: 'movie1', name: 'Inception', extension: 'mp4', date: getRandomDate(), type: 'file' },
            { id: 'movie2', name: 'BladeRunner2049', extension: 'mp4', date: getRandomDate(), type: 'file' },
            { id: 'home-video', name: 'FamilyVacation_2022', extension: 'mp4', date: getRandomDate(), type: 'file' },
            { id: 'tutorial', name: 'CodingTutorial', extension: 'mp4', date: getRandomDate(), type: 'file' },
            { id: 'short-clip', name: 'FunnyCatVideo', extension: 'gif', date: getRandomDate(), type: 'file' },
            { id: 'vlog', name: 'DailyVlog_Episode1', extension: 'mp4', date: getRandomDate(), type: 'file' },
            { id: 'webinar', name: 'TechWebinar_AI', extension: 'mp4', date: getRandomDate(), type: 'file' },
            { id: 'documentary', name: 'NatureDocumentary', extension: 'mp4', date: getRandomDate(), type: 'file' },
            { id: 'cartoon', name: 'OldCartoon_Episode', extension: 'mp4', date: getRandomDate(), type: 'file' },
            {
              id: 'recordings',
              name: 'Recordings',
              type: 'folder',
              children: [
                { id: 'screen-rec', name: 'ScreenRecording_Demo', extension: 'mp4', date: getRandomDate(), type: 'file' },
                { id: 'webcam-rec', name: 'WebcamChat_Friends', extension: 'mp4', date: getRandomDate(), type: 'file' },
                { id: 'gameplay-rec', name: 'GameplayHighlights', extension: 'mp4', date: getRandomDate(), type: 'file' },
              ],
            },
          ],
        },
        {
          id: 'pictures',
          name: 'Pictures',
          type: 'folder',
          children: [
            {
              id: 'vacation',
              name: 'Vacation',
              type: 'folder',
              children: [
                { id: 'pic1', name: 'BeachSunset', extension: 'jpg', date: getRandomDate(), type: 'file' },
                { id: 'pic2', name: 'Mountains', extension: 'png', date: getRandomDate(), type: 'file' },
                { id: 'pic3', name: 'EiffelTower', extension: 'jpeg', date: getRandomDate(), type: 'file' },
                { id: 'pic4', name: 'GrandCanyon', extension: 'jpg', date: getRandomDate(), type: 'file' },
                { id: 'pic5', name: 'CityLights', extension: 'png', date: getRandomDate(), type: 'file' },
              ],
            },
            {
              id: 'screenshots',
              name: 'Screenshots',
              type: 'folder',
              children: [
                { id: 'ss1', name: 'Screenshot_Game', extension: 'png', date: getRandomDate(), type: 'file' },
                { id: 'ss2', name: 'Screenshot_Website', extension: 'jpg', date: getRandomDate(), type: 'file' },
                { id: 'ss3', name: 'ErrorScreenshot', extension: 'png', date: getRandomDate(), type: 'file' },
                { id: 'ss4', name: 'DesktopCapture', extension: 'jpeg', date: getRandomDate(), type: 'file' },
              ],
            },
            {
              id: 'memes',
              name: 'Memes',
              type: 'folder',
              children: [
                { id: 'meme1', name: 'Doge', extension: 'jpg', date: getRandomDate(), type: 'file' },
                { id: 'meme2', name: 'DistractedBoyfriend', extension: 'png', date: getRandomDate(), type: 'file' },
                { id: 'meme3', name: 'OneDoesNotSimply', extension: 'gif', date: getRandomDate(), type: 'file' },
                { id: 'meme4', name: 'SpongebobMock', extension: 'png', date: getRandomDate(), type: 'file' },
              ],
            },
            { id: 'profile-pic', name: 'MyProfilePicture', extension: 'png', date: getRandomDate(), type: 'file' },
            { id: 'wallpaper', name: 'NatureWallpaper', extension: 'jpg', date: getRandomDate(), type: 'file' },
            { id: 'pet-photo', name: 'FluffyCat', extension: 'jpeg', date: getRandomDate(), type: 'file' },
            { id: 'artwork', name: 'DigitalPainting', extension: 'png', date: getRandomDate(), type: 'file' },
            { id: 'event-photo', name: 'BirthdayParty_2024', extension: 'jpg', date: getRandomDate(), type: 'file' },
            { id: 'scanned-doc-pic', name: 'OldFamilyPhoto', extension: 'png', date: getRandomDate(), type: 'file' },
          ],
        },
        {
          id: 'downloads-root',
          name: 'Downloads',
          type: 'folder',
          children: [
            { id: 'chrome-installer-root', name: 'ChromeSetup', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'ebook-root', name: 'LearnVue', extension: 'pdf', date: getRandomDate(), type: 'file' },
            { id: 'archive-root', name: 'PhotosBackup', extension: 'zip', date: getRandomDate(), type: 'file' },
            { id: 'installer-game', name: 'NewGame_Installer', extension: 'exe', date: getRandomDate(), type: 'file' },
            { id: 'movie-trailer', name: 'UpcomingMovie_Trailer', extension: 'mp4', date: getRandomDate(), type: 'file' },
            { id: 'presentation-template', name: 'BusinessTemplate', extension: 'ppt', date: getRandomDate(), type: 'file' },
            { id: 'font-file', name: 'CustomFont', extension: 'zip', date: getRandomDate(), type: 'file' },
            { id: 'software-update', name: 'AppUpdater', extension: 'exe', date: getRandomDate(), type: 'file' },
          ],
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
          children: [
            {
              id: 'drivers',
              name: 'Drivers',
              type: 'folder',
              children: [
                { id: 'audio', name: 'RealtekHD_Driver', extension: 'sys', date: getRandomDate(), type: 'file' },
                { id: 'gpu', name: 'NVIDIA_Driver', extension: 'sys', date: getRandomDate(), type: 'file' },
                { id: 'printer', name: 'HPPrinter_Driver', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'webcam-driver', name: 'LogitechWebcam', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'network-driver', name: 'EthernetDriver', extension: 'exe', date: getRandomDate(), type: 'file' },
              ],
            },
            {
              id: 'bin',
              name: 'Bin',
              type: 'folder',
              children: [
                { id: 'log', name: 'kernel_log', extension: 'log', date: getRandomDate(), type: 'file' },
                { id: 'config', name: 'boot_config', extension: 'cfg', date: getRandomDate(), type: 'file' },
                { id: 'temp-file', name: 'TemporaryData', extension: 'tmp', date: getRandomDate(), type: 'file' },
                { id: 'error-report', name: 'ErrorReport_0724', extension: 'txt', date: getRandomDate(), type: 'file' },
                { id: 'core-dump', name: 'CrashDump', extension: 'log', date: getRandomDate(), type: 'file' },
              ],
            },
            {
              id: 'program-files',
              name: 'Program Files',
              type: 'folder',
              children: [
                { id: 'vscode', name: 'VisualStudioCode', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'notepad', name: 'NotepadPlusPlus', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'browser', name: 'MozillaFirefox', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'media-player', name: 'VLC Media Player', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'adobe-suite', name: 'AdobeCreativeSuite', type: 'folder', children: [
                    { id: 'photoshop-exe', name: 'Photoshop', extension: 'exe', date: getRandomDate(), type: 'file' },
                    { id: 'illustrator-exe', name: 'Illustrator', extension: 'exe', date: getRandomDate(), type: 'file' },
                  ]},
                { id: 'office', name: 'MicrosoftOffice', type: 'folder', children: [
                    { id: 'word-exe', name: 'Word', extension: 'exe', date: getRandomDate(), type: 'file' },
                    { id: 'excel-exe', name: 'Excel', extension: 'exe', date: getRandomDate(), type: 'file' },
                  ]},
                { id: 'utility-app', name: 'SystemCleaner', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'antivirus', name: 'AntivirusSoftware', extension: 'exe', date: getRandomDate(), type: 'file' },
              ],
            },
            {
              id: 'windows',
              name: 'Windows',
              type: 'folder',
              children: [
                { id: 'explorer', name: 'explorer', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'notepad-exe', name: 'notepad', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'system32', name: 'System32', type: 'folder', children: [] },
                { id: 'fonts', name: 'Fonts', type: 'folder', children: [] },
                { id: 'logs', name: 'Logs', type: 'folder', children: [
                    { id: 'system-log', name: 'SystemLog_Boot', extension: 'log', date: getRandomDate(), type: 'file' },
                    { id: 'app-crash-log', name: 'AppCrash_Explorer', extension: 'log', date: getRandomDate(), type: 'file' },
                  ]},
                { id: 'temp', name: 'Temp', type: 'folder', children: [
                    { id: 'temp-setup', name: 'SetupTemp', extension: 'tmp', date: getRandomDate(), type: 'file' },
                  ]},
              ],
            },
            {
              id: 'users',
              name: 'Users',
              type: 'folder',
              children: [
                { id: 'user1', name: 'Admin', type: 'folder', children: [
                    { id: 'user-desktop', name: 'Desktop', type: 'folder', children: [
                        { id: 'user-shortcut', name: 'GameShortcut', extension: 'exe', date: getRandomDate(), type: 'file' },
                        { id: 'user-temp', name: 'TempFile', extension: 'tmp', date: getRandomDate(), type: 'file' },
                      ]},
                    { id: 'user-documents', name: 'Documents', type: 'folder', children: [
                        { id: 'user-report', name: 'MonthlyReport', extension: 'docx', date: getRandomDate(), type: 'file' },
                        { id: 'user-letter', name: 'ThankYouNote', extension: 'pdf', date: getRandomDate(), type: 'file' },
                      ]},
                    { id: 'user-downloads', name: 'Downloads', type: 'folder', children: [
                        { id: 'user-installer', name: 'UtilityInstaller', extension: 'exe', date: getRandomDate(), type: 'file' },
                        { id: 'user-archive', name: 'OldFiles', extension: 'zip', date: getRandomDate(), type: 'file' },
                      ]},
                    { id: 'user-pictures', name: 'Pictures', type: 'folder', children: [
                        { id: 'user-selfie', name: 'Selfie', extension: 'jpg', date: getRandomDate(), type: 'file' },
                      ]},
                  ] },
                { id: 'guest', name: 'Guest', type: 'folder', children: [] },
              ],
            },
            {
              id: 'recycle-bin',
              name: '$Recycle.Bin',
              type: 'folder',
              children: [
                { id: 'deleted1', name: 'OldNote', extension: 'txt', date: getRandomDate(), type: 'file' },
                { id: 'deleted2', name: 'UnwantedPic', extension: 'jpg', date: getRandomDate(), type: 'file' },
                { id: 'deleted3', name: 'TemporaryDownload', extension: 'pdf', date: getRandomDate(), type: 'file' },
                { id: 'deleted4', name: 'CorruptVideo', extension: 'mp4', date: getRandomDate(), type: 'file' },
                { id: 'deleted5', name: 'OldReport', extension: 'docx', date: getRandomDate(), type: 'file' },
                { id: 'deleted6', name: 'EmptyFolder', extension: 'tmp', date: getRandomDate(), type: 'file' }, // Placeholder for deleted folder
              ],
            },
          ],
        },
        {
          id: 'local-disk-c',
          name: 'Local Disk (C:)',
          type: 'folder',
          children: [
            {
              id: 'program-files-c',
              name: 'Program Files',
              type: 'folder',
              children: [
                { id: 'vscode-c', name: 'VisualStudioCode', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'notepad-c', name: 'NotepadPlusPlus', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'chrome-c', name: 'GoogleChrome', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'games-c', name: 'Steam', type: 'folder', children: [] },
              ],
            },
            {
              id: 'windows-c',
              name: 'Windows',
              type: 'folder',
              children: [
                { id: 'explorer-c', name: 'explorer', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'notepad-c-exe', name: 'notepad', extension: 'exe', date: getRandomDate(), type: 'file' },
                { id: 'system32-c', name: 'System32', type: 'folder', children: [] },
                { id: 'syswow64', name: 'SysWOW64', type: 'folder', children: [] },
                { id: 'temp-c', name: 'Temp', type: 'folder', children: [] },
                { id: 'winsxs', name: 'WinSxS', type: 'folder', children: [] },
              ],
            },
            {
              id: 'users-c',
              name: 'Users',
              type: 'folder',
              children: [
                { id: 'user-profile-c', name: 'JohnDoe', type: 'folder', children: [
                    { id: 'desktop-c-user', name: 'Desktop', type: 'folder', children: [] },
                    { id: 'documents-c-user', name: 'Documents', type: 'folder', children: [] },
                    { id: 'downloads-c-user', name: 'Downloads', type: 'folder', children: [] },
                  ] },
              ],
            },
            {
              id: 'programdata',
              name: 'ProgramData',
              type: 'folder',
              children: [],
            },
            {
              id: 'recovery',
              name: 'Recovery',
              type: 'folder',
              children: [
                { id: 'recovery-log', name: 'RecoveryLog', extension: 'log', date: getRandomDate(), type: 'file' },
              ],
            },
            { id: 'pagefile', name: 'pagefile', extension: 'sys', date: getRandomDate(), type: 'file' }, // Placeholder for system file
            { id: 'hiberfil', name: 'hiberfil', extension: 'sys', date: getRandomDate(), type: 'file' }, // Placeholder for system file
          ],
        },
      ],
    }
  }

  function getFolderContent(path: string): (IFile | IFolder)[] {
    const pathSegments = path.split('/').filter(segment => segment !== '')
    if (pathSegments.length === 0) {
      // If path is empty, return the top-level children (root)
      return fileSystem.value.children
    }

    // Special case for 'Home', return children of the home folder directly
    if (pathSegments.length === 1 && pathSegments[0] === 'Home') {
      const homeFolder = fileSystem.value.children.find(f => f.name === 'Home') as IFolder
      return homeFolder ? homeFolder.children : []
    }

    // Start traversal from the root of the file system
    let folderToSearch: IFolder | undefined = fileSystem.value

    for (const segment of pathSegments) {
      if (!folderToSearch) return [] // Path segment not found
      const found = folderToSearch.children.find(
        item => item.type === 'folder' && item.name === segment
      ) as IFolder | undefined
      if (!found) return [] // Folder not found
      folderToSearch = found
    }

    return folderToSearch ? folderToSearch.children : []
  }

  return {
    fileSystem,
    initializeFileManager,
    getFolderContent,
  }
})
