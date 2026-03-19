import { useState } from 'react';

const theme = {
    bg0: '#03070f', bg1: '#060d1a', bg2: '#0a1628', bg3: '#0d1f3c',
    ocean: '#0a4f8a', blue: '#1a7fd4', lblue: '#4fb3f6',
    red: '#c0392b', lred: '#e74c3c',
    accent: '#00b4d8', muted: '#3a5a7a',
    text: '#b8d4ee', textdim: '#527094',
    border: '#0e2a47',
};

const EXT = {
    js: { label: 'JS', color: '#f5c518' },
    jsx: { label: '⚛', color: '#61dafb' },
    css: { label: '~', color: theme.lblue },
    html: { label: 'H', color: theme.lred },
    json: { label: '{}', color: '#f5c518' },
    md: { label: 'M', color: theme.accent },
    ts: { label: 'TS', color: '#3178c6' },
};

function FileIcon({ name }) {
    const ext = name.split('.').pop();
    const { label = '#', color = theme.muted } = EXT[ext] || {};
    return (
        <span style={{
            fontSize: 10, fontWeight: 600, width: 15,
            color, flexShrink: 0, textAlign: 'center'
        }}>
            {label}
        </span>
    );
}

function Folder({ handleInsertNode, explorer }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [showInput, setShowInput] = useState({ visible: false, isFolder: null });

    const handleNew = (e, isFolder) => {
        e.stopPropagation();
        setIsOpen(true);
        setShowInput({ visible: true, isFolder });
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            handleInsertNode(explorer.id, e.target.value.trim(), showInput.isFolder);
            setShowInput({ visible: false, isFolder: null });
        }
        if (e.key === 'Escape') setShowInput({ visible: false, isFolder: null });
    };

    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 2 }}>
                {/* Folder row */}
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '4px 8px', borderRadius: 5, cursor: 'pointer',
                        background: hovered ? theme.bg3 : 'transparent',
                        transition: 'background 0.1s', userSelect: 'none',
                        fontFamily: "'Fira Code', monospace", fontSize: 12.5,
                    }}
                >
                    {/* Chevron */}
                    <span
                        onClick={() => setIsOpen(o => !o)}
                        style={{
                            fontSize: 8, color: theme.muted, width: 10, flexShrink: 0,
                            display: 'inline-block',
                            transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                            transition: 'transform 0.15s',
                        }}
                    >▶</span>

                    {/* Icon */}
                    <span
                        onClick={() => setIsOpen(o => !o)}
                        style={{ fontSize: 13, color: isOpen ? theme.lblue : theme.blue }}
                    >
                        {isOpen ? '▾ ' : '▸ '}
                    </span>

                    {/* Name */}
                    <span
                        onClick={() => setIsOpen(o => !o)}
                        style={{ flex: 1, color: isOpen ? theme.lblue : theme.text }}
                    >
                        {explorer.name}
                    </span>

                    {/* Action buttons */}
                    {hovered && (
                        <div style={{ display: 'flex', gap: 3 }}>
                            {[['+dir', true], ['+file', false]].map(([label, isDir]) => (
                                <button
                                    key={label}
                                    onClick={(e) => handleNew(e, isDir)}
                                    style={{
                                        background: theme.bg0, border: `1px solid ${theme.ocean}`,
                                        borderRadius: 4, color: theme.textdim,
                                        fontSize: 9, fontFamily: "'Fira Code', monospace",
                                        padding: '1px 5px', cursor: 'pointer',
                                    }}
                                    onMouseEnter={e => {
                                        e.target.style.color = theme.accent;
                                        e.target.style.borderColor = theme.accent;
                                        e.target.style.background = theme.bg3;
                                    }}
                                    onMouseLeave={e => {
                                        e.target.style.color = theme.textdim;
                                        e.target.style.borderColor = theme.ocean;
                                        e.target.style.background = theme.bg0;
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Children */}
                {isOpen && (
                    <div style={{
                        paddingLeft: 16,
                        borderLeft: `1px solid ${theme.border}`,
                        marginLeft: 13, marginTop: 1,
                    }}>
                        {showInput.visible && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 8px' }}>
                                <span style={{
                                    fontSize: 11,
                                    color: showInput.isFolder ? theme.blue : theme.lblue,
                                }}>
                                    {showInput.isFolder ? '▸' : '#'}
                                </span>
                                <input
                                    autoFocus
                                    type="text"
                                    onKeyDown={onKeyDown}
                                    onBlur={() => setShowInput({ visible: false, isFolder: null })}
                                    placeholder={showInput.isFolder ? 'folder name...' : 'file name...'}
                                    style={{
                                        background: theme.bg0, border: `1px solid ${theme.accent}`,
                                        borderRadius: 4, color: theme.accent,
                                        fontFamily: "'Fira Code', monospace", fontSize: 12,
                                        padding: '3px 8px', outline: 'none', width: 150,
                                    }}
                                />
                            </div>
                        )}

                        {explorer.items.map(exp => (
                            <Folder key={exp.id} explorer={exp} handleInsertNode={handleInsertNode} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '3px 8px', borderRadius: 5, cursor: 'default',
                fontFamily: "'Fira Code', monospace", fontSize: 12.5,
                color: theme.textdim, transition: 'background 0.1s, color 0.1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = theme.bg3; e.currentTarget.style.color = theme.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.textdim; }}
        >
            <span style={{ width: 10, flexShrink: 0 }} />
            <FileIcon name={explorer.name} />
            <span>{explorer.name}</span>
        </div>
    );
}

export default Folder;